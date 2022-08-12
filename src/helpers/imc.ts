export type Level = {
    title: string;
    color: string;
    icon: 'down' | 'up' ;
    imc: number[];
    yourImc?: number;
};
export const levels: Level[] = [
    { title: 'Abaixo do peso', color: '#ffc000', icon: 'down', imc: [0, 18.5]},
    { title: 'Peso normal', color: '#0ead69', icon: 'up', imc: [18.6, 24.9]},
    { title: 'Sobrepeso', color: '#ff8c00', icon: 'down', imc: [25, 29.9]},
    { title: 'Obesidade', color: '#ff0000', icon: 'down', imc: [30, 99]}
]

export const calculateImc = (height:number, weight:number) => {
    const imc = weight / (height * height);

    for(let i in levels) {
        if(imc >= levels[i].imc[0] && imc <= levels[i].imc[1]) {
            let levelCopy: Level = {...levels[i]}; //para não alterar levels e o botão voltar funcionar, começando sem yourImc, criei essa cópia de cada posição do levels

            levelCopy.yourImc = parseFloat(imc.toFixed(2));
            return levelCopy;
        } 
    }
    return null;
};