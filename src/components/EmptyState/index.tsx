const EmptyState = ({emptyMessage}: {emptyMessage: string}) => {
    return (
        <div
                className="
                    bg-bg/70
                    h-full 
                    flex
                    justify-center
                    items-center
                    px-4
                    py-10
                    sm:px-6
                    lg:px-8

                "
            >
                <div 
                    className="
                        text-center 
                        items-center 
                        flex 
                        flex-col
                    "
                >
                    <h3

                        className="
                            mt-2
                            text-2xl
                            font-semibold
                            text-tx
                        "
                    >
                        {
                            emptyMessage
                        }
                    </h3>
                </div>
                
            </div>
    )
}

export default EmptyState;