type Slide = {
    _id: string;
    presentationId:string,
    title: string;
    number: number;
    text: string;
    createdAt?: string;
}

export default Slide;