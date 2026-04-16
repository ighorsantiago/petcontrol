function maskCPF(value: string) {
    return value
        .replace(/\D/g, '')
        .replace(/(\d{3})(\d)/, '$1.$2')
        .replace(/(\d{3})(\d)/, '$1.$2')
        .replace(/(\d{3})(\d{1,2})/, '$1-$2')
        .replace(/(-\d{2})\d+?$/, '$1');
}

// (00) 00000-0000
function maskPhone(value: string) {
    return value
        .replace(/\D/g, '')
        .replace(/(\d{2})(\d)/, '($1) $2')
        .replace(/(\d{5})(\d{4})(\d)/, '$1-$2');
}

// 00000-000
function maskCEP(value: string) {
    return value.replace(/\D/g, '').replace(/^(\d{5})(\d{3})+?$/, '$1-$2');
}

// 00/00/0000
function maskDate(value: string) {
    return value
        .replace(/\D/g, '')
        .replace(/(\d{2})(\d)/, '$1/$2')
        .replace(/(\d{2})(\d)/, '$1/$2')
        .replace(/(\d{4})(\d)/, '$1');
}

export { maskDate };
