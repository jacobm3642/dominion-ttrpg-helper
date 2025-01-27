working_char=''

function d12() {
  return Math.floor(Math.random() * 12) + 1;
}

function set_content(id, value="") {
  document.getElementById(id).innerHTML = value;
}

function add_content(id, value="") {
  document.getElementById(id).innerHTML += value;
}

function get_value(id) {
  return document.getElementById(id).value
}

function save() {
  content = [entitys, equipment]
  localStorage.setItem("master", JSON.stringify(content))
}

function load() {
  const content = JSON.parse(localStorage.getItem("master"));

  const savedEntities = content[0];
  console.log(savedEntities)
  for (var i = 0; i < Object.keys(savedEntities).length; i++){
    const entityData = savedEntities[Object.keys(savedEntities)[i]]
    const e = Entity.fromJSON(entityData)
    entitys[entityData.name] = e
  };
}

function display_stats(entity_name) {
  working_char=entity_name
  entitys[entity_name].display_stats()
}

function make_stat_card(entity, func, color="gray") {
  stats = entity.get_basic_stats()
  stat_string = ""
  for (var i = 0; i < Object.keys(stats).length; i++) {
    stat_string += `${Object.keys(stats)[i]}: ${stats[Object.keys(stats)[i]]} `
    if ((i+1)%3 == 0) {
      stat_string += "<br>"
    }
  }
  block = `<div class="card char_card" style="background-color: ${color};" onclick="${func}('${entity.name}')">
  <div class="row"><h6>${entity.name}</h6></div>
  <div class="right card_stats">${stat_string}</div>
  </div>`
  return block
}

function display_entitys(func='display_stats', loc='entity-stats-container') {
  set_content(loc);
  for (var i = 0; i < Object.keys(entitys).length; i++) {
    add_content(loc, make_stat_card(entitys[Object.keys(entitys)[i]], func));
  }
}

function display_equipment(type, func='NULL', loc='entity-stats-container') {
  set_content(loc)
  items = equipment[type]
  for (var i = 0; i < Object.keys(items).length; i++) {
    add_content(loc, make_stat_card(items[Object.keys(items)[i]], func));
  }
}

function add_equipment(name) {
  if (!working_char) {
    console.error("No working character selected.");
    return;
  }

  for (const category in equipment) {
    if (name in equipment[category]) {
      entitys[working_char].inv.push(equipment[category][name]);
      entitys[working_char].display_stats()
      return;
    }
  }
  console.error(`Equipment "${name}" not found in any category.`);
}

function names(arr) {
  out = []
  for (var i = 0; i < arr.length; i++) {
    out.push(arr[i].name)
  }
  console.log(out)
  return out
}

function find_named(name, arr) {
  for (var i = 0; i < arr.length; i++) {
    if (arr[i].name == name) {
      return i
    }
  }
  return -1
}

function member_of(atom, arr) {
  for (var i = 0; i < arr.length; i++) {
    if (arr[i] == atom) {
      return true
    }
  }
  return false
}

function flaten_iths(ith, arr) {
  out = []
  for (var i = 0; i < arr.length; i++) {
    out.push(arr[i][ith])
  }
  return out;
}

function equip_equipment(name) {
  if (!working_char) {
    console.error("No working character selected.");
    return;
  }

  if (member_of(name, names(entitys[working_char].inv))) {
    entitys[working_char].equiped.push(entitys[working_char].inv[find_named(name, entitys[working_char].inv)]);
    entitys[working_char].inv = entitys[working_char].inv.filter(function(item) {
      return item.name !== name
    })
    entitys[working_char].display_stats()
    return;
  }

  console.error(`Equipment "${name}" not found in inv.`);
}

function unequip_equipment(name) {
  if (!working_char) {
    console.error("No working character selected.");
    return;
  }

  if (member_of(name, names(entitys[working_char].equiped))) {
    entitys[working_char].inv.push(entitys[working_char].equiped[find_named(name, entitys[working_char].equiped)]);
    entitys[working_char].equiped = entitys[working_char].equiped.filter(function(item) {
      return item.name !== name
    })
    entitys[working_char].display_stats()
    return;
  }

  console.error(`Equipment "${name}" not found in inv.`);
}

function get_max(arr) {
  max = -Infinity
  for (var i = 0; i < arr.length; i++) {
    if (arr[i] > max) {
      max = arr[i]
    }
  }
  return max
}

function add_item() {
  const block = `<button onclick='display_equipment("Armour", "add_equipment")'>add Armour</button>
  <button onclick='display_equipment("missileWeapons", "add_equipment")'>add missileWeapons</button>
  <button onclick='display_equipment("meleeWeapons", "add_equipment")'>add meleeWeapons</button>
  `
  set_content("entity-stats-container", block);
}