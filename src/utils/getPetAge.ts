export function getPetAge(birth: string) {
    
    const birthYear = Number(birth.substring(6));
    const birthMonth = Number(birth.substring(3, 5));
    const birthDay = Number(birth.substring(0, 2));
    
    let born = new Date(birthYear, (birthMonth -1), birthDay)
    
    const today = new Date();
    
    const diff = Math.abs(today.getTime() - born.getTime());
    const days = (diff / (1000 * 60 * 60 * 24));
    const months = Math.trunc(days / 30);
    const years = months / 12;

    const yearsOld = Math.trunc(years)
    // const monthsOld = String(years.toPrecision(2)).substring(2, 3)
    const monthsOld = String(Math.floor(years * 100) / 100).substring(2, 3)
    
    const petAge = `${yearsOld} anos e ${monthsOld} meses`

    return { yearsOld, monthsOld };
}
