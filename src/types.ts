import { FormEvent } from "react"

export type Record = {
    id: number
    title: string
    place_of_origin: string
    artist_display: string
    inscriptions: string
    date_start: number
    date_end: number
}

export type OverLayPanelType = {
    overlayRef: any
    selectedRows: number
    setSelectedRows: (num: number) => void
    handleSubmitRows: (e: FormEvent<HTMLFormElement>) => void
}

export type TableData = {
    currentRecords: Record[]
    totalRecords: number
}
