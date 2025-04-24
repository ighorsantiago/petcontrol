const options = [
    { key: 'info', name: 'Geral', icon: 'information-outline' },
    { key: 'vaccines', name: 'Vacinas', icon: 'needle' },
    { key: 'medications', name: 'Medicações', icon: 'medical-bag' },
    { key: 'deworming', name: 'Vermífugos', icon: 'content-cut' },
    { key: 'weight', name: 'Peso', icon: 'weight-kilogram' },
    { key: 'hygiene', name: 'Higiene', icon: 'food-steak' },
    { key: 'appointments', name: 'Consultas', icon: 'shower-head' },
];

const optionsHome = [
    { key: 'vaccines', name: 'Vacinas', icon: require('@/assets/vaccine.png') },
    { key: 'medications', name: 'Medicações', icon: require('@/assets/medicine.png') },
    { key: 'deworming', name: 'Vermífugo', icon: require('@/assets/deworming.png') },
    { key: 'hygiene', name: 'Higiene', icon: require('@/assets/hygiene.png') },
];

const optionsLinks = [
    { key: 'articles', name: 'Artigos', icon: 'page-next-outline' },
    { key: 'classes', name: 'Aulas', icon: 'book-open-page-variant' },
    { key: 'links', name: 'Links Úteis', icon: 'link' },
];

export { options, optionsHome, optionsLinks };
