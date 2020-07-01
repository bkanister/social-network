import React from 'react'

type Props = {
    show: boolean
    custom?: any
    confirm: any
    cancel: () => void
    text: string
}

const ModalWindow = ({show, custom, confirm, cancel, text}: Props) => {
    return (
        <div>
                <header>
                    <title>Warning</title>
                    <p>&times;</p>
                </header>

                <div>
                    <p>Are you sure you want to {text}?</p>
                </div>

                <footer>
                    <button onClick={custom ? () => confirm(custom) : confirm}>Yes</button>
                    <button onClick={cancel}>No</button>
                </footer>
        </div>
    )
}

export default ModalWindow