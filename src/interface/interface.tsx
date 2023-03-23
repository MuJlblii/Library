export interface IBook {
    issueYear: string,
    rating: number | null,
    title: string,
    authors: string[],
    image: {
        url: string,
    }  | null,
    categories: string[],
    id: number,
    booking: IBooking | null,
    delivery: IDelivery | null,
    histories: IHistories[] | null,
}
export interface IBookCard extends IBook {
    category: string | undefined,
}

export interface IBookPage extends IBook {
    description: string,
    publish: string,
    pages: string,
    cover: string,
    weight: string,
    format: string,
    ISBN: string,
    producer: string,
    images: Array<{url: string}> | null,
    comments: IComments[] | null
}

export interface IComments {
    id: number,
    rating: number,
    text: string,
    createdAt: string,
    user: IUserComment
}

export interface IUserComment {
    commentUserId: number,
    firstName: string,
    lastName: string,
    avatarUrl: string
}

export interface IBooking {
    id: number,
    order: boolean,
    dateOrder: string,
    customerId: number,
    customerFirstName: string,
    customerLastName: string
}

export interface IDelivery {
    id: number,
    handed: boolean,
    dateHandedFrom: string,
    dateHandedTo: string,
    recipientId: number,
    recipientFirstName: string,
    recipientLastName: string,
}

export interface IHistories {
    id: number,
    userId: number,
}

export interface ICategories {
    name: string,
    path: string,
    id: number,
}

export interface IBooksState extends ICategories {
    list: IBook[] | null,

}

export interface IToaster {
    type: string,
    message: string,
}