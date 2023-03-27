export type BookType = {
    issueYear: string,
    rating: number | null,
    title: string,
    authors: string[],
    image: {
        url: string,
    }  | null,
    categories: string[],
    id: number,
    booking: BookingType | null,
    delivery: DeliveryType | null,
    histories: HistoriesType[] | null,
}
export type BookCardType = BookType & {
    category: string | undefined,
}

export type BookPageType = BookType & {
    description: string,
    publish: string,
    pages: string,
    cover: string,
    weight: string,
    format: string,
    ISBN: string,
    producer: string,
    images: Array<{url: string}> | null,
    comments: CommentsType[] | null
}

export type CommentsType = {
    id: number,
    rating: number,
    text: string,
    createdAt: string,
    user: UserCommentType
}

export type UserCommentType = {
    commentUserId: number,
    firstName: string,
    lastName: string,
    avatarUrl: string
}

export type BookingType = {
    id: number,
    order: boolean,
    dateOrder: string,
    customerId: number,
    customerFirstName: string,
    customerLastName: string
}

export type DeliveryType = {
    id: number,
    handed: boolean,
    dateHandedFrom: string,
    dateHandedTo: string,
    recipientId: number,
    recipientFirstName: string,
    recipientLastName: string,
}

export type HistoriesType = {
    id: number,
    userId: number,
}

export type CategoriesType = {
    name: string,
    path: string,
    id: number,
}

export type BooksStateType = CategoriesType & {
    list: BookType[] | null,

}

export type ToasterType = {
    type: string,
    message: string,
}