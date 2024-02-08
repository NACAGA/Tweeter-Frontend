import CommentButton from 'lib/components/comment/comment-button/CommentButton';
import CommentPost from 'lib/components/comment/comment-flyout/CommentPost';
import Comment from 'lib/components/comment/comment-flyout/Comment';
import PostUtils from 'lib/utils/post-utils';

function JoinGroups() {
    const content =
        'Unicorns, with their ethereal grace, tread lightly, leaving a faint shimmer in their wake. They remind us that beauty is transient, and must be approached with the utmost gentleness and respect. #UnicornWhispers #MagicInDelicacy 🦄✨';
    const post = PostUtils.createPost('Stephen Speilberg', new Date(), content, false, 'Unicorn Enthusiests');
    return (
        <div>
            <Comment commentid={1}></Comment>
            <CommentButton postid={1} postInfo={post}></CommentButton>
        </div>
    );
}

export default JoinGroups;
