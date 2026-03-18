const { Random } = require('random-js');
const random = new Random();

// Face definitions using emoji keys (resolved at runtime via diceEmojis map)
// blank = empty face, cut = stroke, 2cut = double stroke, 3cut = triple stroke
// blossom = flower, 2blossom = multi-flower, blossom_cut = flower+stroke
const BLANK = 'blank';

const DIE_FACES = {
    w: [BLANK, BLANK, 'cut', 'blossom_cut', 'blossom', 'blossom'],                              // d6
    m: [BLANK, BLANK, BLANK, 'blossom_cut', '2blossom', 'blossom', 'blossom', '2blossom'],      // d8
    f: [BLANK, BLANK, BLANK, BLANK, 'blossom_cut', 'blossom'],                                   // d6
    r: [BLANK, BLANK, BLANK, 'cut', 'cut', '2cut', '2cut', '2cut'],                             // d8
    i: [BLANK, BLANK, 'cut', 'cut', 'blossom_cut', '2blossom'],                                  // d6
};

const DIE_LABELS = {
    w: 'Way',
    m: 'Mastery',
    f: 'Fortune',
    r: 'Risk',
    i: 'Injury',
};

function rollPool(args, diceEmojis) {
    // Parse args like ['2w', '1m', '1f', '2r', '1i']
    const pool = {};
    for (const arg of args) {
        const match = arg.match(/^(\d+)([wmfri])$/i);
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

    for (const type of ['w', 'm', 'f', 'r', 'i']) {
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
