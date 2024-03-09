import { ObjectId } from "mongodb"

type SummarizedData = {
    _id?: ObjectId,
    title: string,
    text: string
}

export default SummarizedData;