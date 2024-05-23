import React, { useContext, useEffect} from 'react'
import TypeList from '../components/typeList';
import { fetchTypes } from "../http/typeAPI";
import { Context } from '../index'
import { observer } from 'mobx-react-lite';
import '../styles/shop.css'

const Shop = observer(() => {
  const {item} = useContext(Context)

  useEffect(() => {
      fetchTypes().then(data => item.setTypes(data))
  }, [])

  return (
    <main>
      <div className="content">
          <div className="info-text">
              <p>Години роботи: 10:00 - 23:00</p>
              <p>Безкоштовна доставка на суму від 199 грн</p>
              <p>Доставка здійснюється тільки по місту Житомир</p>
          </div>
          <h1 className="title-text">Ми пропонуємо:</h1>
          <TypeList/>
      </div>
    </main>
  );
});

export default Shop;