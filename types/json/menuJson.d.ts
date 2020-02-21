declare module '*/menu.json' {
  interface ingredientsData {
    id: number,
    name: string,
    description: string,
    image: string
  }
  interface menuList {
    id: number,
    name: string,
    description: string,
    ingredients: ingredientsData[]
  }

  const data: menuList[]
  export = data
}