import { IoStarSharp, IoStarOutline, IoStarHalfSharp } from "react-icons/io5";

export const averageRating = (comments) => {

    const commentsWithRating = comments.filter((comment) => comment.rating !== null);
    const commentsWithRatingLength = commentsWithRating.length;
    let totalRating = commentsWithRatingLength;
    let roundedRating;
    let fullStars = [];
    let emptyStars = [];
    let halfStar = false;
    let integerPart;
    let decimalPart;
    let emptyStarsCount;

    if (commentsWithRatingLength > 0) {

        const avgRating = commentsWithRating.reduce((acc, comment) => acc + comment.rating, 0) / commentsWithRatingLength;
        roundedRating = Math.ceil(avgRating * 2) / 2;

        integerPart = Math.floor(roundedRating);
        decimalPart = roundedRating - integerPart;

        for (let i = 0; i < integerPart; i++) {
            fullStars.push(<IoStarSharp className="text-lg" />);
        }

        if (decimalPart >= 0.5) {
            fullStars.push(<IoStarHalfSharp className="text-lg" />);
            halfStar = true;
        }

        emptyStarsCount = 5 - fullStars.length;
        for (let i = 0; i < emptyStarsCount; i++) {
            emptyStars.push(<IoStarOutline className="text-lg" />);
        }

        return { roundedRating, totalRating, fullStars, emptyStars, halfStar };

    } else {
        for (let i = 0; i < 5; i++) {
            emptyStars.push(<IoStarOutline className="text-lg" />);
        }
        return { totalRating, emptyStars, halfStar };;
    }
}

export const totalRating = (comments) => {

    const commentsWithRating = comments.filter((comment) => comment.rating !== null);
    const commentsWithRatingLength = commentsWithRating.length;

    return commentsWithRatingLength;
}

export function individualRating(rating) {

    let fullStars = [];
    let emptyStars = [];
    let halfStar = false;

    const integerPart = Math.floor(rating);
    const decimalPart = rating - integerPart;

    for (let i = 0; i < integerPart; i++) {
        fullStars.push(<IoStarSharp className="text-lg" />);
    }

    if (decimalPart >= 0.5) {
        fullStars.push(<IoStarHalfSharp className="text-lg" />);
        halfStar = true;
    }

    const emptyStarsCount = 5 - fullStars.length;
    for (let i = 0; i < emptyStarsCount; i++) {
        emptyStars.push(<IoStarOutline className="text-lg" />);
    }

    return { fullStars, emptyStars };
}