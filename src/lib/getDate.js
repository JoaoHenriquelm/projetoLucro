export function getDate() {
    const newDate = new Date()
    const year = newDate.getFullYear()
    const month = newDate.getMonth() + 1

    return month < 10 ? (`${year}/0${month}`) : (`${year}/${month}`)
  }