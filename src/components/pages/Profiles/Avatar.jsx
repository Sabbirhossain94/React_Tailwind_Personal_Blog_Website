
import {useState,useEffect}  from 'react';
import supabase from '../../../supabaseClient';

export default function Avatar({ url, size, onUpload }) {
    const [avatarUrl, setAvatarUrl] = useState(null)
    const [uploading, setUploading] = useState(false)
  
    useEffect(() => {
      if (url) downloadImage(url)
    }, [url])
  
    const downloadImage = async (path) => {
      try {
        const { data, error } = await supabase.storage
          .from('avatars')
          .download(path)
        if (error) {
          throw error
        }
        const url = URL.createObjectURL(data)
        setAvatarUrl(url)
      } catch (error) {
        console.log('Error downloading image: ', error.message)
      }
    }
  
    const uploadAvatar = async (event) => {
      try {
        setUploading(true)
  
        if (!event.target.files || event.target.files.length === 0) {
          throw new Error('You must select an image to upload.')
        }
  
        const file = event.target.files[0]
        const fileExt = file.name.split('.').pop()
        const fileName = `${Math.random()}.${fileExt}`
        const filePath = `${fileName}`
  
        let { error: uploadError } = await supabase.storage
          .from('avatars')
          .upload(filePath, file)
  
        if (uploadError) {
          throw uploadError
        }
  
        onUpload(filePath)
      } catch (error) {
        alert(error.message)
      } finally {
        setUploading(false)
      }
    }
  
    return (
      <div className='' style={{ width: size }} aria-live="polite">
        <img
          src={avatarUrl? avatarUrl : `https://i.imgur.com/W2AT377.jpg`}
          alt={avatarUrl ? 'Avatar' : 'No image'}
          className="avatar image ring-1"
          style={{ height: size, width: size }}
        />
        {uploading ? (
          'Uploading...'
        ) : (
          <>
            <label className="mt-[15px] text-center" htmlFor="single">
              Upload an avatar
            </label>
            <div className="visually-hidden">
              <input
                type="file"
                id="single"
                accept="image/*"
                onChange={uploadAvatar}
                disabled={uploading}
                className=" text-blue-400"
              />
            </div>
          </>
        )}
      </div>
    )
  }