export const calculateGameSize = (): { width: number, height: number } => {
    const width: number = window.innerWidth
    const height: number = window.innerHeight

    return { width, height }
}
