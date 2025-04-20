entitys = {}
equipment = {}
char_count = 0

class Character {
  constructor(entity) {
    this.base = entity;
    this.id = get_unique_id();
    this.health = this.get_stat("WithIn");
    this.maxHealth = this.get_stat("WithIn");
    this.Armor = this.get_stat("Armor");
    this.running_penlaty = 0
  }

  get_stat(stat) {
    return this.base.get_stat(stat);
  }

  take_damage(amount) {
    const mitigation = d12()
    if (mitigation <= this.Armor && mitigation != 12) {
      amount -= mitigation;
    } 

    if (amount < 1) {
      amount = 1
    }

    this.health -= amount
    if (this.health < 0) {
      this.running_penlaty = Math.abs(this.health)
    } else {
      this.running_penlaty = 0
    }
  }

  strike(penlaty) {
    const hit_roll = d12();
    if (hit_roll <= this.base.get_stat("Strike") - penlaty - this.running_penlaty && hit_roll != 12) {
      return hit_roll
    }
    return 0
  }
  
}

class Equipment {
  constructor(name, stats, auto_add=true) {
    this.name = name;
    this.stats = stats;

    if (!name in Object.keys(equipment) || auto_add) {
      equipment[name] = this;
    }
  }

  mod(stat) {
    if (stat in this.stats) {
      return this.stats[stat];
    }
    return 0;
  }

  get_basic_stats() {
    return this.stats 
  }

  toJSON() {
    return {
      name: this.name,
      stats: this.stats
    };
  }

  static fromJSON(json) {
    const data = JSON.parse(json);
    return new Equipment(data.name, data.stats);
  }
}

class Entity {
  constructor(name) {
    this.name = name;
    this.stats = {
      "vigour": 1, "agility": 1, "stamina": 1,
      "intuition": 1, "intellect": 1, "luck": 1, 
      "combat": ["vigour", "agility"], 
      "witchcraft": ["intellect", "luck"],
      "Grip": ["vigour"], "Muscle": ["vigour"], "Climbing": ["vigour"], "Swimming": ["vigour"],
      "Timing": ["agility"], "Stealth": ["agility"], "Horsemanship": ["agility"],
      "WithIn": ["stamina"], "WithMag": ["stamina"], "Hold Breath": ["stamina"],
      "Alertness": ["intuition"],
      "Medical Lore": ["intellect"], "Literacy": ["intellect"], "Heraldry": ["intellect"],
      "Strike":["combat"], "Missile Strike":["combat"], "Brawling":["combat"], "Feint":["combat"], "Disarm":["combat"], "Dodge":["combat"], "Parry":["combat"], "Block":["combat"], "Movement":["combat"],
      "Alchemy":["witchcraft"], "Arcana":["witchcraft"], "Conjuring":["witchcraft"], "Enchantment":["witchcraft"], "Hex":["witchcraft"],"Illusion":["witchcraft"],"Sorcery":["witchcraft"], "Summoning":["witchcraft"],
      "Armour":["WithIn"]
    };
    this.bonuses = {};
    this.rounding = Math.floor;
    this.equiped = [];
    this.inv = [];

    this.sp = 0

    if (name in Object.keys(entitys)) {
      console.error("already exists");
    } else {
      entitys[name] = this;
    }
  }

  up() {
    this.sp = (Number(this.get_stat("luck")) * get_max(flaten_iths(1, this.get_cads()["witchcraft"])))
    this.stats["Armour"] = ["WithIn"]
  }

  toJSON() {
    if (this.rounding == Math.ceil) {
      var val = true
    } else {
      var val = false
    }
    return {
      name: this.name,
      stats: this.stats,
      bonuses: this.bonuses,
      rounding: val,
      equiped: this.equiped,
      inv: this.inv.map(item => item.toJSON())
    };
  }

  static fromJSON(data) {
    const entity = new Entity(data.name);
    entity.stats = data.stats;
    entity.bonuses = data.bonuses;
    entity.favorable_rounding(data.rounding);
    entity.equiped = data.equiped.map(item => Equipment.fromJSON(JSON.stringify(item)));
    entity.inv = data.inv.map(item => Equipment.fromJSON(JSON.stringify(item)));
    entity.up()
    return entity;
  }

  favorable_rounding(state) {
    this.rounding = state ? Math.ceil : Math.floor;
  }

  add_bonus(stat, value) {
    this.bonuses[stat] = value;
    this.up()
  }

  get_bonus(stat) {
    if (stat in this.bonuses) {
      return this.bonuses[stat]
    }
    return 0
  }

  get_stat(stat) {
    let val = 0;

    if (typeof this.stats[stat] === "number") {
      val = this.stats[stat];
    } else if (Array.isArray(this.stats[stat])) {
      for (let i = 0; i < this.stats[stat].length; i++) {
        val += this.get_stat(this.stats[stat][i]);
      }
      val = this.rounding(val / this.stats[stat].length);
    }
    if (stat in this.bonuses) {
      val += this.bonuses[stat];
    }

    for (var i = 0; i < this.equiped.length; i++) {
      val += this.equiped[i].mod(stat);
    }

    return val;
  }

  get_basic_stats() {
    var out = {}
    for (var i = 0; i< Object.keys(this.stats).length; i++) {
      if (typeof this.stats[Object.keys(this.stats)[i]] == "number" || this.stats[Object.keys(this.stats)[i]].length == 2) {
        out[Object.keys(this.stats)[i]] = this.get_stat(Object.keys(this.stats)[i])
      }
    }
    return out
  }

  set_stat(stat, val) {
    if (typeof this.stats[stat] === "number") {
      this.stats[stat] = val;
    } else {
      console.error(`Invalid stat name: ${stat}`);
    }
    this.up()
  }

  get_cads() {
    const keys = Object.keys(this.stats);
    var cad = {};
    for (var i = 0; i < keys.length; i++) {
      if (typeof this.stats[keys[i]] == "number" || this.stats[keys[i]].length == 2) {
        cad[keys[i]] = [];
        continue;
      } else if (this.stats[keys[i]] in this.get_basic_stats()) {
        cad[this.stats[keys[i]]].push([keys[i], this.get_stat(keys[i])]);
      }
    }
    return cad;
  }

  display_stats() {
    var out = `<h5><b>${this.name}</b></h5><br><p>Max Health: ${this.get_stat("WithIn")}, Armour: ${this.get_stat("Armour")}, SP: ${this.sp} </p><button onclick="add_item()">add items</button>`;
    const cads = this.get_cads();
    const values = Object.keys(cads);
    for (var i = 0; i < values.length; i++) {
      var block = "<div class='card'>";
      for (var j = 0; j < cads[values[i]].length; j++) {
        block += stat_card(cads[values[i]][j][0], cads[values[i]][j][1], this);
      }
      block += '</div>'
      out += `<div class='col-2 card'> <p><a onclick="update_stat('${this.name}', '${values[i]}')"><b>${values[i]} : ${this.get_stat(values[i])}</b><a\><\p> ${block} </div>`;
    }
    out += "<div class='col-4 card'><h5><b>Inventory</b></h5>";
    for (var i = 0; i < this.inv.length; i++) {
      out += make_stat_card(this.inv[i], "equip_equipment");
    }
    out += '</div>'
    out += "<div class='col-4 card'><h5><b>Equiped</b></h5>";
    for (var i = 0; i < this.equiped.length; i++) {
      out += make_stat_card(this.equiped[i], "unequip_equipment");
    }
    out += '</div>'
    set_content("entity-stats-container", out);
  }
}

function create_entity() {
  block = `<input type="text" id="entity"><button onclick="instantiate_entity()">Create entity</button>`
  set_content("entity-stats-container", block)
}

function instantiate_entity() {
  var name = get_value("entity")
  e = new Entity(name)
  e.display_stats()
  save()
}

function update_stat(entity_name, stat) {
  block = ` Update : <input type="number" id="update" value="${entitys[entity_name].get_stat(stat)}"><button onclick="set_stat('${entity_name}', '${stat}')"> update ${stat}</button>`;
  set_content("entity-stats-container", block);
}

function set_stat(entity_name, stat) {
  var val = get_value("update");
  entitys[entity_name].set_stat(stat, Number(val));
  entitys[entity_name].display_stats();
}

function add_bonus_screen(entity_name, stat) {
  block = ` Update : <input type="number" id="bonus" value="${entitys[entity_name].get_bonus(stat)}"><button onclick="add_bonus('${entity_name}', '${stat}')"> set ${stat} bonus</button>`;
  set_content("entity-stats-container", block);
}

function add_bonus(entity_name, stat) {
  var val = get_value("bonus");
  entitys[entity_name].add_bonus(stat, Number(val));
  entitys[entity_name].display_stats();
}

function stat_card(name, value, entity) {
  return `<a onclick='add_bonus_screen("${entity.name}", "${name}")'><div class='row'><p> ${name} : ${value} </p></div></a>`
}

function get_unique_id() {
  return ++char_count;
}
