import { useState, useEffect, useCallback } from 'react'
import { loadComment } from '../../../../services/blogs/comments/loadComment';
import { addComment } from '../../../../services/blogs/comments/addComment';
import { updateComment } from '../../../../services/blogs/comments/updateComment';
import { addLike } from '../../../../services/blogs/comments/addLike';
import Review from './Review';
import Rating from './Rating';
import Filter from './Filter';
import List from './List';
import CommentModal from '../../../layout/modal/comment/CommentModal';
import DeleteModal from '../../../layout/modal/comment/DeleteModal';
import { averageRating } from '../../../../helpers/rating';
import useSession from '../../../../hooks/useSession';

function Comments({ blogId }) {
    const { session } = useSession();
    const [createComment, setCreateComment] = useState({
        content: "",
        commentId: null,
        isSignInModalOpen: false,
        isDeleteModalOpen: false,
        loading: false,
        rating: "",
        message: "",
    });
    const [edit, setEdit] = useState({
        isEdit: false,
        commentId: null,
        content: '',
        rating: "",
        loading: false,
    });
    const [filter, setFilter] = useState({
        sortBy: "latest",
        rating: ""
    })
    const [allComments, setAllComments] = useState([]);
    const [ratingInfo, setRatingInfo] = useState(null);
    const [loading, setLoading] = useState(false);
    const [isLiking, setIsLiking] = useState(false);

    const fetchComments = useCallback(async () => {

        if (blogId === undefined) return;
        setLoading(true)
        try {
            const commentsData = await loadComment(blogId, filter);
            setAllComments(commentsData);
        } catch (error) {
            console.error("Failed to load comments:", error);
        } finally {
            setLoading(false)
        }

    }, [blogId, filter]);

    useEffect(() => {
        fetchComments();
    }, [fetchComments]);

    useEffect(() => {

        const ratingData = averageRating(allComments);
        setRatingInfo(ratingData);

    }, [allComments]);

    const submitComment = async (e) => {
        e.preventDefault();

        if (!session) {
            setCreateComment({ ...createComment, isSignInModalOpen: true, message: "" });
            return;
        }

        if (edit.isEdit && edit.content.trim() === '' && edit.rating === "") {
            alert()
            setEdit((prevState) => ({ ...prevState, isEdit: false, content: "", commentId: null, rating: "", loading: false }));
            return;
        }

        if (edit.isEdit) {
            setEdit({ ...edit, loading: true });
            try {
                await updateComment(session, edit);
                fetchComments();
            } catch (error) {
                console.error("Failed to update comment:", error);
            } finally {
                setEdit((prevState) => ({ ...prevState, isEdit: false, content: '', rating: "", commentId: null, loading: false }));
            }
            return
        }

        setCreateComment({ ...createComment, loading: true });

        try {
            await addComment(session, createComment, blogId);
            fetchComments();
        } catch (error) {
            console.error("Failed to submit comment:", error);
        } finally {
            setCreateComment({ ...createComment, content: "", loading: false, rating: "" });
        }
    };

    const handleLike = async (commentId) => {

        if (!session?.user?.id) {
            setCreateComment({ ...createComment, isSignInModalOpen: true, message: "You need to be logged in to add a like" });
            return;
        }
        setIsLiking(true);
        try {
            await addLike(session, commentId);
            await fetchComments();
        } catch (error) {
            console.error("Failed to like comment:", error);
        } finally {
            setIsLiking(false);
        }
    }


    return (
        <div>
            <CommentModal
                createComment={createComment}
                setCreateComment={setCreateComment}
            />
            <DeleteModal
                createComment={createComment}
                setCreateComment={setCreateComment}
                fetchComments={fetchComments}
            />
            <Rating
                ratingInfo={ratingInfo}
            />
            <Review
                submitComment={submitComment}
                createComment={createComment}
                setCreateComment={setCreateComment}
            />
            <Filter
                allComments={allComments}
                filter={filter}
                setFilter={setFilter}
            />
            <List
                loading={loading}
                isLiking={isLiking}
                createComment={createComment}
                setCreateComment={setCreateComment}
                allComments={allComments}
                edit={edit}
                setEdit={setEdit}
                submitComment={submitComment}
                handleLike={handleLike}
            />

        </div>
    )
}

export default Comments