exports.seed = async knex => {
  await knex('note').del()
  await knex('note').insert([{
    id: 1,
    name: 'middle c',
    image: "https://i.imgur.com/9bQJFbF.png"
  },{
    id: 2,
    name: 'middle c',
    image: "https://i.imgur.com/XvlrlNc.png"
  },{
    id: 3,
    name: 'e',
    image: "https://i.imgur.com/RmkKW5e.png"
  },{
    id: 4,
    name: 'e',
    image: "https://i.imgur.com/GLAUkN5.png"
  },{
    id: 5,
    name: 'g',
    image: "https://i.imgur.com/wThK8dO.png"
  },{
    id: 6,
    name: 'g',
    image: "https://i.imgur.com/g0PpApu.png"
  },{
    id: 7,
    name: 'b',
    image: "https://i.imgur.com/CTf2307.png"
  },{
    id: 8,
    name: 'b',
    image: "https://i.imgur.com/rXiVjWX.png"
  },{
    id: 9,
    name: 'd',
    image: "https://i.imgur.com/ySTjLwx.png"
  },{
    id: 10,
    name: 'd',
    image: "https://i.imgur.com/8EcAp5S.png"
  },{
    id: 11,
    name: 'f',
    image: "https://i.imgur.com/YD16PuE.png"
  },{
    id: 12,
    name: 'f',
    image: "https://i.imgur.com/CaQhgRk.png"
  },{
    id: 13,
    name: 'a',
    image: "https://i.imgur.com/68cOQZY.png"
  },{
    id: 14,
    name: 'a',
    image: "https://i.imgur.com/c4rOisf.png"
  },{
    id: 15,
    name: 'c',
    image: "https://i.imgur.com/aN4LzeQ.png"
  },{
    id: 16,
    name: 'c',
    image: "https://i.imgur.com/eLuoB0v.png"
  }])
};