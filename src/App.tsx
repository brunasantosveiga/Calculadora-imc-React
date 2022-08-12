import { useState } from 'react';
import styles from './App.module.css';
import { levels, calculateImc, Level } from './helpers/imc';
import poweredImage from './assets/powered.png';
import leftArrowImage from './assets/leftarrow.png'
import { GridItem } from './components/GridItem/GridItem'

const App = () => {
  const [heightField, setHeightField] = useState<number>(0);
  const [weightField, setWeightField] = useState<number>(0);
  const [toShow, setToShow] = useState<Level | null>(null);
  
  const calculateButton = () => {
    if((heightField && weightField) != 0) {
      setToShow(calculateImc(heightField, weightField));
    } else {
      alert('Preencha todos os campos!')
    }
  }

  const backButton = () => {
    setToShow(null);
    setHeightField(0);
    setWeightField(0);

  }

  return (
    <div className={styles.main}>
      <header>
        <div className={styles.headerContainer}>
          <img src={poweredImage} alt='' width={150}></img>
        </div>
      </header>
      <div className={styles.container}>
        <div className={styles.leftSide}>
          <h1>Calcule o seu IMC</h1>
          <p>IMC é a sigla para Índice de Massa Corpórea, parâmetro adotado pela Organização Mundial de Saúde para calcular o peso ideal de cada pessoa.</p>
          <input
            type='number'
            placeholder='Digite a sua altura. Ex: 1.59 (em metros)'
            value={heightField > 0 ? heightField : ''}
            onChange={e => setHeightField(parseFloat(e.target.value))} //transforma o valor do input em numero com decimal
            disabled={toShow ? true : false}
          />
          <input
            type='number'
            placeholder='Digite o seu peso. Ex: 75.3 (em kg)'
            value={weightField > 0 ? weightField : ''}
            onChange={e => setWeightField(parseFloat(e.target.value))}
            disabled={toShow ? true : false}
          />

          <button onClick={calculateButton} disabled={toShow ? true : false}>Calcular</button>
        </div>
        <div className={styles.rightSide}>
          {!toShow &&
            <div className={styles.grid}>
              {levels.map((item, index) => ( //map pode receber dois param. o 1o é o item e o 2o seu indice 
                <GridItem key={index} item={item}/> //item é uma prop que passo para o componente GridItem , key é uma identificação obrigatória ao percorrer um array, como estamos em um map isso precisa ser dinamico e não um número fixo, por isso passamos 2 parâmetros para o map, pois o segundo é exatamente a posição de cada item do array percorrido
              ))} 
            </div> 
          }
          {toShow &&
            <div className={styles.rightBig}>
              <div className={styles.rightArrow} onClick={backButton}>
                <img src={leftArrowImage} alt='' width={25} />
              </div>
              <GridItem item={toShow}/>
            </div>
          }
        </div> 
      </div>
    </div>
  );
};

export default App;
