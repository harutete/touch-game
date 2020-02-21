declare module '*/ingredients.json' {
  interface ingredientsData {
    id: number,
    name: string,
    description: string,
    image: string
  }

  const data: ingredientsData[]
  export = data
}