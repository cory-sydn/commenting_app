import dbConnect from '../../../../util/mongo'
import Comment from '../../../../models/Comment'

export default async function handler(req, res) {
    const { method, query:{id} } = req

    await dbConnect()

    if(method === "PUT") {
      try {
        const {childId} = req.body
        const parentComment = await Comment.findByIdAndUpdate(id,  {
          $addToSet:{childs: childId},
        }, {new: true,})
        res.status(200).json(parentComment)
      } catch (err) {
        res.status(500).json(err)
        console.error(err);
      }
    }
}