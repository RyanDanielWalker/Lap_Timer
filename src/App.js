import React, { useState, useEffect } from 'react';
import {
  IonPage,
  IonContent,
  IonButton,
  IonText,
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonCardContent,
  IonGrid,
  IonRow,
  IonCol
} from '@ionic/react';
import './App.css';

/* Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';

/* Optional CSS utils that can be commented out */
import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';

/* Theme variables */
import './theme/variables.css';

const App = () => {

  const [time, setTime] = useState(0);
  const [timerOn, setTimerOn] = useState(false);
  const [laps, setLaps] = useState([])

  const timerMinutes = ("0" + Math.floor((time / 60000) % 60)).slice(-2)
  const timerSeconds = ("0" + Math.floor((time / 1000) % 60)).slice(-2)
  const timerMilliseconds = ("0" + ((time / 10) % 100)).slice(-2)

  useEffect(() => {
    let time = null;
    if (timerOn) {
      time = setInterval(() => {
        setTime(prevState => prevState + 10)
      }, 10)
    } else {
      clearInterval(time)
    }
    return () => clearInterval(time)
  }, [timerOn])

  const onClickingLap = () => {
    let lapTime = time - laps.reduce((a, b) => a + b, 0)
    setLaps(prevLaps => [...prevLaps, lapTime])
  }

  const onClickingReset = () => {
    setTime(0);
    setLaps([]);
    setTimerOn(false);
  }

  const renderLaps = laps.map((lap, index) => {
    const lapMinutes = ("0" + Math.floor((lap / 60000) % 60)).slice(-2)
    const lapSeconds = ("0" + Math.floor((lap / 1000) % 60)).slice(-2)
    const lapMilliseconds = ("0" + ((lap / 10) % 100)).slice(-2)
    return (
      <h4 key={index}>Lap {index + 1}: {lapMinutes}:{lapSeconds}:{lapMilliseconds}</h4>
    )
  })

  return (
    <IonPage>
      <IonContent>
        <IonGrid>
          <IonRow style={{ marginTop: '15vh' }} class="ion-justify-content-center">
            <IonCol></IonCol>
            <IonCol size='6'>
              <IonCard style={{ textAlign: 'center' }}>
                <IonCardHeader>
                  <IonCardTitle>Lap Timer</IonCardTitle>
                </IonCardHeader>
                <IonCardContent>
                  <IonText>
                    <h1>{timerMinutes}:{timerSeconds}:{timerMilliseconds}</h1>
                  </IonText>
                  {!timerOn &&
                    <IonButton fill="outline" onClick={() => setTimerOn(true)}><IonText color="">Start</IonText></IonButton>}
                  {timerOn &&
                    <IonButton fill="outline" onClick={() => setTimerOn(false)}>Stop</IonButton>}
                  {timerOn &&
                    <IonButton fill="outline" onClick={onClickingLap}>Lap</IonButton>}
                  {!timerOn &&
                    <IonButton fill="outline" onClick={onClickingReset}>Reset</IonButton>}
                  <IonText>{renderLaps}</IonText>
                </IonCardContent>
              </IonCard>
            </IonCol>
            <IonCol></IonCol>
          </IonRow>
        </IonGrid>
      </IonContent>
    </IonPage>
  )
}

export default App;
