const { Random } = require('random-js');
const random = new Random();

// Face definitions using emoji keys (resolved at runtime via diceEmojis map)
// blank = empty face, cut = stroke, 2cut = double stroke, 3cut = triple stroke
// blossom = flower, 2blossom = multi-flower, blossom_cut = flower+stroke
const BLANK = 'blank';

const DIE_FACES = {
    w: [BLANK, BLANK, BLANK, 'blossom_cut', 'blossom_cut', 'blossom', 'blossom', '2blossom'],           // d8
    a: [BLANK, BLANK, BLANK, BLANK, 'blossom', 'blossom'],                                      // d6
    r: [BLANK, BLANK, BLANK, BLANK, 'cut', '2cut', '2cut', '2cut'],                             // d8
};

const DIE_LABELS = {
    w: 'Way',
    a: 'Attribute',
    r: 'Risk',
};

function rollPool(args, diceEmojis) {
    // Parse args like ['2w', '3a', '4r'] or shorthand ['234'] meaning 2w 3a 4r
    const pool = {};
    for (const arg of args) {
        const shorthand = arg.match(/^(\d)(\d)(\d)$/);
        if (shorthand) {
            const [, w, a, r] = shorthand.map(Number);
            if (w > 0) pool['w'] = (pool['w'] || 0) + Math.min(w, 20);
            if (a > 0) pool['a'] = (pool['a'] || 0) + Math.min(a, 20);
            if (r > 0) pool['r'] = (pool['r'] || 0) + Math.min(r, 20);
            continue;
        }
        const match = arg.match(/^(\d+)([war])$/i);
        if (match) {
            const type = match[2].toLowerCase();
            const count = Math.min(parseInt(match[1]), 20);
            if (count > 0) {
                pool[type] = (pool[type] || 0) + count;
            }
        }
    }

    if (Object.keys(pool).length === 0) {
        return null;
    }

    function resolveEmoji(key) {
        return diceEmojis[key] ? `${diceEmojis[key]}` : `[${key}]`;
    }

    // Point values for totals
    const BLOSSOM_VALUE = { blank: 0, cut: 0, '2cut': 0, blossom: 1, '2blossom': 2, blossom_cut: 1 };
    const CUT_VALUE     = { blank: 0, cut: 1, '2cut': 2, blossom: 0, '2blossom': 0, blossom_cut: 1 };

    const lines = [];
    let totalBlossoms = 0;
    let totalCuts = 0;

    for (const type of ['w', 'a', 'r']) {
        if (!pool[type]) continue;
        const count = pool[type];
        const faces = DIE_FACES[type];
        const rolls = [];
        for (let i = 0; i < count; i++) {
            const face = faces[random.integer(0, faces.length - 1)];
            rolls.push(resolveEmoji(face));
            totalBlossoms += BLOSSOM_VALUE[face] || 0;
            totalCuts     += CUT_VALUE[face]     || 0;
        }
        lines.push(`**${DIE_LABELS[type]}** (${count}): ${rolls.join(' ')}`);
    }

    lines.push(`\n🌸 **${totalBlossoms}** blossoms  💢 **${totalCuts}** strain`);

    return lines.join('\n');
}

module.exports = { rollPool };
