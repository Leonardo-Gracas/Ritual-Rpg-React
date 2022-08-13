import React from 'react';
import { useState } from 'react';
import './App.css';
import Button from './Elements/Button';

export default props => {
  const [area, setArea] = useState(
    [
      {
        nome: '◓',
        value: 0,
        ended: false
      },
      {
        nome: '⊠',
        value: 0,
        ended: false
      },
      {
        nome: '◮',
        value: 0,
        ended: false
      }
    ]
  )

  const [p, setP] = useState({
    way: 1,
    expo: 0,
    vio: 0,
    target: 0,
    round: 0,
    log: [{}],
    random: undefined,
    clear: undefined,
  })

  const [inp, setInp] = useState()

  function ShowInput() {
    if (p.way == 4) {
      let a = (
        <>
          <label>Purificado: </label>
          <input type="text" onChange={(e) => { if (isNaN(e.target.value)) { e.target.value = '' } }} id='input' />
        </>
      )
      setInp(a)
    } else if (p.way > 1) {
      let a = (
        <>
          <label>Violação: </label>
          <input type="text" onChange={(e) => { if (isNaN(e.target.value)) { e.target.value = '' } }} id='input' />
        </>
      )
      setInp(a)
    } else { setInp(<></>) }
  }

  function Aplicar() {
    if (p.way != undefined) {
      let local = area
      switch (p.way) {
        case 1:
          local[p.target].value += 1
          let range = [0, 1, 2]
          let random = p.target
          let limit = 0
          while (random == p.target) {
            let j = Math.floor(Math.random() * 3)
            random = range[j]

            limit++
            if (limit > 20) {
              break;
            }
          }
          local[random].value += 1
          p.random = random
          if (local[random].value > 10) {
            local[random].value = 10
          }
          break;

        case 2:
          let vio = Number(document.getElementById('input').value)
          if (vio != undefined) {
            local[p.target].value += 3
            p.vio += vio
            console.log(vio)
          }
          break;

        case 3:
          let viol = Number(document.getElementById('input').value)
          if (viol != undefined) {
            local[p.target].value += 5
            p.vio += viol
            console.log(viol)
          }
          break;

        case 4:
          let clear = Number(document.getElementById('input').value)
          if (clear != undefined) {

            if (p.vio < clear) { clear = p.vio; p.vio = 0 } else { p.vio -= clear }
          }
          p.clear = clear
          break;
        default:
          break;
      }
      if (local[p.target].value > 10) { local[p.target].value = 10 }
      p.expo = local[0].value + local[1].value + local[2].value + p.vio
      setArea([...local])
      p.round += 1
      if (p.round % 4 == 0) {
        p.vio += Math.pow(2, (p.round / 4 - 1))
      }

      p.log = [{
        act: p.way,
        dir: p.target,
        round: p.round,
        clear: p.clear,
        random: p.random,
        val1: area[p.target].value,
        val2: p.random == undefined ? undefined : area[p.random].value,
        vio: p.vio
      }, ...p.log]
      p.random = undefined
      p.clear = undefined
    }
  }

  function Reload() {
    area.forEach(item => {
      item.value = 0
    })

    setP({
      way: 1,
      expo: 0,
      vio: 0,
      target: 0,
      round: 0,
      log: [{}],
      random: undefined,
      clear: undefined,
    })
  }

  console.log('refresh')

  return (
    <div className='App'>
      <button id='reload' onClick={() => Reload()}>↻</button>
      <div className='main'>
        <div className="expo">
          <strong>Exposição Total: {p.expo}/30</strong>
        </div>
        <div className="vio">
          <strong>Violação: {p.vio}</strong>
        </div>
        <div className="Areas">
          {area.map((item, index) => {
            return <strong key={index}>{item.nome} {item.value}/10</strong>
          })}
        </div>
      </div>

      <h3>Comandos</h3>
      <div className="Comands">
        <Button
          id={1}
          name='Sussuro'
          way={1}
          p={p}
          func={() => ShowInput()}
        />
        <Button
          id={2}
          name='Palpite'
          way={2}
          p={p}
          func={() => ShowInput()}
        />
        <Button
          id={3}
          name='Pergunta'
          way={3}
          p={p}
          func={() => ShowInput()}
        />
        <Button
          id={4}
          name='Empatia'
          way={4}
          p={p}
          func={() => ShowInput()}
        />
      </div>
      {
        p.way != 4
          ? <><h3>Alvo</h3> <div className='Destinos'>
            <Button
              id={0}
              name='Corpo ◓'
              target={0}
              p={p}
              func={() => ShowInput()}
            />
            <Button
              id={1}
              name='Mente ⊠'
              target={1}
              p={p}
              func={() => ShowInput()}
            />
            <Button
              id={2}
              name='Alma ◮'
              target={2}
              p={p}
              func={() => ShowInput()}
            />
          </div></>
          : false
      }
      <div className='Comands' id='fill'>
        {inp}
        <button onClick={() => Aplicar()}>Aplicar</button>
      </div>
      <div className='Registro'>
        {p.log.map((item, index) => {

          let msg
          if (item.act == 1) {
            msg = (<p className='log'>{p.log.length - index - 1}<span>{(item.round % 4 == 0) && (item.round > 0) ? '+' : false}</span> - Sussuro - {area[item.dir].nome}: {item.val1} e {area[item.random].nome}: {item.val2}</p>)
          }
          if (item.act == 2) {
            msg = (<p className='log'>{p.log.length - index - 1}<span>{(item.round % 4 == 0) && (item.round > 0) ? '+' : false}</span> - Palpite - {area[item.dir].nome}: {item.val1}; Violação: {item.vio}</p>)
          }
          if (item.act == 3) {
            msg = (<p className='log'>{p.log.length - index - 1}<span>{(item.round % 4 == 0) && (item.round > 0) ? '+' : false}</span> - Pergunta - {area[item.dir].nome}: {item.val1}; Violação: {item.vio}</p>)
          }
          if (item.act == 4) {
            msg = (<p className='log'>{p.log.length - index - 1}<span>{(item.round % 4 == 0) && (item.round > 0) ? '+' : false}</span> - Empatia: {item.clear} reduzido{item.clear == 1 ? '' : 's'}</p>)
          }

          return (
            <div key={index}>{msg}</div>
          )
        })}
      </div>
    </div>
  );
};
