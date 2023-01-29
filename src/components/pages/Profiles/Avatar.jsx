
// import { useState, useEffect } from 'react';
// import supabase from '../../../supabaseClient';

// export default function Avatar({ url, size, onUpload }) {
  

 



//   return (
//     <div className='' style={{ width: size }} aria-live="polite">
//       <img
//         src={avatarUrl ? avatarUrl : `https://i.imgur.com/W2AT377.jpg`}
//         alt={avatarUrl ? 'Avatar' : 'No image'}
//         className="avatar image ring-1"
//         style={{ height: size, width: size }}
//       />
//       {uploading ? (
//         'Uploading...'
//       ) : (
//         <>
//           <label className="mt-[15px] text-center" htmlFor="single">
//             Upload an avatar
//           </label>
//           <div className="visually-hidden">
//             <input
//               type="file"
//               id="single"
//               accept="image/*"
//               onChange={uploadAvatar}
//               disabled={uploading}
//               className=" text-blue-400"
//             />
//           </div>
//         </>
//       )}
//     </div>
//   )
// }