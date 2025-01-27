const meleeWeapons = [
    { name: "Axe, Battle 1H", stats: { "Strike": 3, "Parry": 0, "Disarm": -2, "Timing": -6, "Armour": -1, "AP": 3 } },
    { name: "Axe, Hand 1H", stats: { "Strike": 2, "Parry": 0, "Disarm": -2, "Timing": -4, "Armour": 0, "AP": 1 } },
    { name: "Axe, Pole 2H", stats: { "Strike": 3, "Parry": 0, "Disarm": -3, "Timing": -3, "Armour": -1, "AP": 3 } },
    { name: "Bastardsword 1H", stats: { "Strike": 2, "Parry": -2, "Disarm": -1, "Timing": -8, "Armour": 0, "AP": 3 } },
    { name: "Bastardsword 2H", stats: { "Strike": 3, "Parry": -1, "Disarm": 0, "Timing": -8, "Armour": 0, "AP": 3 } },
    { name: "Broadsword 1H", stats: { "Strike": 2, "Parry": 1, "Disarm": 1, "Timing": -7, "Armour": 0, "AP": 2 } },
    { name: "Club 1H", stats: { "Strike": 0, "Parry": -4, "Disarm": 0, "Timing": -4, "Armour": 0, "AP": 0 } },
    { name: "Dagger 1H", stats: { "Strike": 0, "Parry": 0, "Disarm": 0, "Timing": 0, "Armour": 0, "AP": 1 } },
    { name: "Flail 1H", stats: { "Strike": 2, "Parry": 0, "Disarm": 2, "Timing": -6, "Armour": 0, "AP": 2 } },
    { name: "Greatsword 2H", stats: { "Strike": 4, "Parry": -2, "Disarm": -2, "Timing": -2, "Armour": -1, "AP": 3 } },
    { name: "Lance 1H", stats: { "Strike": 2, "Parry": -4, "Disarm": -2, "Timing": -6, "Armour": 0, "AP": 2 } },
    { name: "Longsword 1H", stats: { "Strike": 2, "Parry": 0, "Disarm": 0, "Timing": -6, "Armour": 0, "AP": 2 } },
    { name: "Mace, Heavy 1H", stats: { "Strike": 3, "Parry": 0, "Disarm": 0, "Timing": -4, "Armour": 0, "AP": 3 } },
    { name: "Mace, Light 1H", stats: { "Strike": 2, "Parry": 0, "Disarm": -2, "Timing": -2, "Armour": 0, "AP": 2 } },
    { name: "Maul 2H", stats: { "Strike": 4, "Parry": 0, "Disarm": -4, "Timing": -2, "Armour": -2, "AP": 3 } },
    { name: "Morningstar 1H", stats: { "Strike": 1, "Parry": -4, "Disarm": 0, "Timing": -4, "Armour": 0, "AP": 1 } },
    { name: "Pike 1H", stats: { "Strike": 1, "Parry": 0, "Disarm": -4, "Timing": -6, "Armour": 0, "AP": 2 } },
    { name: "Quarterstaff 2H", stats: { "Strike": 1, "Parry": 3, "Disarm": 1, "Timing": -4, "Armour": 0, "AP": 1 } },
    { name: "Rapier 1H", stats: { "Strike": 1, "Parry": -2, "Disarm": -2, "Timing": -1, "Armour": 0, "AP": 2 } },
    { name: "Scimitar 1H", stats: { "Strike": 2, "Parry": -2, "Disarm": 0, "Timing": -3, "Armour": 0, "AP": 2 } },
    { name: "Scythe 2H", stats: { "Strike": 0, "Parry": 0, "Disarm": -3, "Timing": -7, "Armour": 0, "AP": 2 } },
    { name: "Shortsword 1H", stats: { "Strike": 1, "Parry": 0, "Disarm": 0, "Timing": -2, "Armour": 0, "AP": 2 } },
    { name: "Spear 1H", stats: { "Strike": 0, "Parry": -4, "Disarm": -4, "Timing": -4, "Armour": -1, "AP": 0 } },
    { name: "Warhammer 1H", stats: { "Strike": 2, "Parry": -4, "Disarm": -2, "Timing": -6, "Armour": -2, "AP": 2 } },
    { name: "Whip 1H", stats: { "Strike": 0, "Parry": 0, "Disarm": 4, "Timing": -5, "Armour": 0, "AP": 2 } }
];

const missileWeapons = [
    { name: "Axe, Throwing", stats: { "MissileStrike": 1, "Parry": 0, "Disarm": -2, "Timing": -4, "Armour": 0, "AP": 1 } },
    { name: "Blowpipe", stats: { "MissileStrike": 0, "Parry": 0, "Disarm": -2, "Timing": 0, "Armour": 0, "AP": 1 } },
    { name: "Composite Bow", stats: { "MissileStrike": 0, "Parry": -3, "Disarm": -1, "Timing": 0, "Armour": 0, "AP": 1 } },
    { name: "Crossbow", stats: { "MissileStrike": 2, "Parry": -3, "Disarm": -1, "Timing": 0, "Armour": -1, "AP": 2 } },
    { name: "Knife, Throwing", stats: { "MissileStrike": 0, "Parry": 0, "Disarm": -2, "Timing": -3, "Armour": 0, "AP": 1 } },
    { name: "Longbow", stats: { "MissileStrike": 1, "Parry": -3, "Disarm": -3, "Timing": 0, "Armour": 0, "AP": 1 } },
    { name: "Musket", stats: { "MissileStrike": 0, "Parry": -4, "Disarm": -7, "Timing": -1, "Armour": -2, "AP": 3 } },
    { name: "Sling", stats: { "MissileStrike": 1, "Parry": 0, "Disarm": -4, "Timing": 0, "Armour": 0, "AP": 1 } },
    { name: "Spear", stats: { "MissileStrike": 1, "Parry": -3, "Disarm": -4, "Timing": 0, "Armour": 0, "AP": 1 } }
];

const armors = [
    { name: "No armour", stats: { "Armour": 0, "Agility": 0, "Movement": 0, "Parry": 0, "Dodge": 0, "AP": 0 } },
    { name: "Padded Armour", stats: { "Armour": 1, "Agility": 0, "Movement": -1, "Parry": 0, "Dodge": 0, "AP": 1 } },
    { name: "Leather", stats: { "Armour": 2, "Agility": 0, "Movement": -1, "Parry": 0, "Dodge": -1, "AP": 2 } },
    { name: "Scale", stats: { "Armour": 3, "Agility": 0, "Movement": -1, "Parry": 0, "Dodge": -1, "AP": 3 } },
    { name: "Brigandine", stats: { "Armour": 4, "Agility": 0, "Movement": -2, "Parry": -1, "Dodge": -2, "AP": 4 } },
    { name: "Mail, Partial", stats: { "Armour": 5, "Agility": -1, "Movement": -2, "Parry": -1, "Dodge": -2, "AP": 5 } },
    { name: "Mail, Full", stats: { "Armour": 6, "Agility": -1, "Movement": -3, "Parry": -2, "Dodge": -2, "AP": 6 } },
    { name: "Plate, Partial", stats: { "Armour": 7, "Agility": -2, "Movement": -3, "Parry": -2, "Dodge": -3, "AP": 7 } },
    { name: "Plate, Full", stats: { "Armour": 8, "Agility": -2, "Movement": -4, "Parry": -3, "Dodge": -3, "AP": 8 } }
];

function make_equipment(item) {
    var e = new Equipment(item.name, item.stats, false)
    return e
}

function make_equipment_block(items) {
    return items.reduce((out, item) => {
        out[item.name] = make_equipment(item);
        return out;
    }, {});
}

function add_all_items() {
    equipment["Armour"] = make_equipment_block(armors)
    equipment["missileWeapons"] = make_equipment_block(missileWeapons)
    equipment["meleeWeapons"] = make_equipment_block(meleeWeapons)
}