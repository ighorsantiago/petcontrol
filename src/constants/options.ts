import vaccine from '@/assets/vaccine.png';
import medicine from '@/assets/medicine.png';
import deworming from '@/assets/deworming.png';
import hygiene from '@/assets/hygiene.png';

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
    {
        key: 'vaccines',
        name: 'Vacinas',
        icon: vaccine,
    },
    {
        key: 'medications',
        name: 'Medicações',
        icon: medicine,
    },
    {
        key: 'deworming',
        name: 'Vermífugo',
        icon: deworming,
    },
    {
        key: 'hygiene',
        name: 'Higiene',
        icon: hygiene,
    },
];

const optionsLinks = [
    { key: 'articles', name: 'Artigos', icon: 'page-next-outline' },
    { key: 'classes', name: 'Aulas', icon: 'book-open-page-variant' },
    { key: 'links', name: 'Links Úteis', icon: 'link' },
];

export { options, optionsHome, optionsLinks };
