declare module '*/menu.json' {
  interface menuList {
    id: number,
    name: string,
    description: string,
    ingredients: []
  }

  const data: menuList[]
  export = data
}