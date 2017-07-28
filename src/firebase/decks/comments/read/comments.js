import {refParent} from '../../../../keys';

export default function (deckId, uid, callback) {
  return refParent('deck-comments').once("value", snapshot => {
    if (snapshot.child(deckId).val()) {
      let arr = [];

      snapshot.child(deckId).forEach(childSnapshot => {
        let comment = childSnapshot.val();
        arr.push({
          upvotes: comment.upvotes,
          downvotes: comment.downvotes,
          votes: comment.votes,
          id: comment.id,
          author: comment.author,
          created: comment.created,
          patch: comment.patch,
          text: comment.text,
          voteType: comment[uid]
        });
      });
      callback(arr)
    } else {
      callback([])
    }
  });
}