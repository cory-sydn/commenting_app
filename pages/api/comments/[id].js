import dbConnect from '../../../util/mongo'
import Comment from '../../../models/Comment'

export default async function handler(req, res) {
    const { method, query:{id} } = req

    await dbConnect()

    if(method === "PUT") {
      try {
          const comment = await Comment.findByIdAndUpdate(id, req.body, {new: true,})
          res.status(201).json(comment)
      } catch (err) {
          res.status(500).json(err)
          console.error(err);
      }
    }
}