declare module '*/ingredients.json' {
  interface ingredientsData {
    id: number,
    name: string,
    image: string
  }

  const data: ingredientsData[]
  export = data
}