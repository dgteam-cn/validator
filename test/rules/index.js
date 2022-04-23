const {Validator, Messages, Rules} = require('../../dist/index.cjs.js')
const messagesZh = require('../../messages/zh.json')
Messages.zh = messagesZh

const assert = require('power-assert')
const data = {

    'correct.required': {value: 'abc', rule: {string: true, required: true}},

    'correct.equals': {value: 'abc', rule: {string: true, equals: 'correct.required'}},
    'correct.different': {value: 'abcd', rule: {string: true, different: 'correct.required'}},
    'correct.alpha': {value: 'abcABC', rule: {string: true, alpha: true}},
    'correct.alphaDash': {value: 'abcABC_', rule: {string: true, alphaDash: true}},
    'correct.alphaNumeric': {value: 'abcABC0123456789', rule: {string: true, alphaNumeric: true}},
    'correct.alphaNumericDash': {value: 'abcABC_0123456789', rule: {string: true, alphaNumericDash: true}},

    'correct.contains': {value: 'abc', rule: {contains: 'a'}},
    'correct.base64': {value: 'aHR0cHMlM0EvL3d3dy5ucG1qcy5jb20=', rule: {base64: true}},
    'correct.base64.url': {value: 'aHR0cHMlM0EvL3d3dy5ucG1qcy5jb20b', rule: {base64: {url: true}}},

    'correct.date': {value: '2021-09-10', rule: {date: true}},
    'correct.iso8601.1': {value: '2020-10-01T12:00:00.883Z', rule: {iso8601: true}},
    'correct.iso8601.2': {value: '2020-10-01T12:00:00+08:00', rule: {iso8601: true}},
    'correct.iso8601.3': {value: '2009-02-26T12:00:00', rule: {iso8601: true}},

    'correct.mobile.1': {value: 18076644960, rule: {mobile: 'zh-CN'}},
    'correct.mobile.2': {value: '+8618076644960', rule: {mobile: 'zh-CN'}},
    'correct.email': {value: 'abc@ddd.com', rule: {email: true}},
    'correct.lowercase': {value: 'abc', rule: {lowercase: true}},
    'correct.uppercase': {value: 'ABC', rule: {uppercase: true}},

    'correct.hexColor.1': {value: '#666', rule: {hexColor: true}},
    'correct.hexColor.2': {value: '#666666', rule: {hexColor: true}},
    'correct.rgbColor.1': {value: 'rgb(0,10,255)', rule: {rgbColor: true}},
    'correct.rgbColor.2': {value: 'rgb(0%,10%,50%)', rule: {rgbColor: true}},
    'correct.rgbColor.3': {value: 'rgba(0,10,255,.5)', rule: {rgbColor: true}},

    'correct.ip.4': {value: '192.168.0.0', rule: {ip: 4}},
    'correct.ip.6': {value: '2001:0db8:86a3:08d3:1319:8a2e:0370:7344', rule: {ip: 6}},
    'correct.uuid.4': {value: '144d622b-e83a-40ea-8ca1-66af8a86261c', rule: {uuid: 4}},
    'correct.md5': {value: 'c520855f2515dbc130884c2ab5a8abfe', rule: {md5: true}},
    'correct.hash.md5': {value: 'c520855f2515dbc130884c2ab5a8abfe', rule: {hash: 'md5'}},
    'correct.mimeType': {value: 'image/png', rule: {mimeType: true}},

    'correct.empty.int': {value: undefined, rule: {int: true}},
    'correct.empty.float': {value: undefined, rule: {float: true}},
    'correct.empty.boolean': {value: undefined, rule: {boolean: true}},
    'correct.empty.string': {value: undefined, rule: {string: true}},
    'correct.empty.array': {value: undefined, rule: {array: true}},
    'correct.empty.object': {value: undefined, rule: {object: true}},

    'correct.empty.string.int': {value: '', rule: {int: true}},
    'correct.empty.string.float': {value: '', rule: {float: true}},
    'correct.empty.string.boolean': {value: '', rule: {boolean: true}},
    'correct.empty.string.string': {value: '', rule: {string: true}},
    'correct.empty.string.array': {value: '', rule: {array: true}},
    'correct.empty.string.object': {value: '', rule: {object: true}},

    'correct.parse.string.int': {value: '1', rule: {int: true}},
    'correct.parse.string.float': {value: '1.25', rule: {float: true}},
    'correct.parse.string.boolean': {value: 'false', rule: {boolean: true}},
    'correct.parse.number.string': {value: 123, rule: {string: true}},
    'correct.parse.string.array': {value: '"[1]"', rule: {array: true}},
    'correct.parse.string.object': {value: "{}", rule: {object: true}},
    'correct.parse.children.string.int': {value: {age: '66'}, rule: {object: true, children: {age: {int: true}}}},

    'correct.in': {value: true, rule: {in: [1, 'false', true]}},
    'correct.notIn': {value: 2, rule: {notIn: [1, 'false', true]}},
    'correct.checkbox': {value: [1, 2, 3], rule: {checkbox: [1, 2, 3, 4, 5]}},

    'correct.int': {value: 10, rule: {int: true}},
    'correct.int.min': {value: 10, rule: {int: {min: 5}}},
    'correct.int.max': {value: 10, rule: {int: {max: 30}}},
    'correct.int.gt': {value: 30, rule: {int: {gt: 10}}},
    'correct.int.lt': {value: 5, rule: {int: {lt: 10}}},

    'correct.float': {value: '50.5', rule: {float: true}},
    'correct.float.min': {value: 50.5, rule: {float: {min: 10}}},
    'correct.float.max': {value: 50.5, rule: {float: {max: 100}}},
    'correct.float.gt': {value: 50.5, rule: {float: {gt: 10}}},
    'correct.float.lt': {value: 30.5, rule: {float: {lt: 100}}},
    'correct.float.decimal': {value: 50.5, rule: {float: {decimal: 2}}},

    'correct.length.string': {value: '55555', rule: {string: true, length: {min: 1, max: 10}}},
    'correct.length.string.mix': {value: '55555', rule: {string: true, length: {min: 1}}},
    'correct.length.string.max': {value: '55555', rule: {string: true, length: {max: 10}}},
    'correct.length.object': {value: {a: 1}, rule: {length: {max: 100}}},
    'correct.length.number': {value: 12345, rule: {length: {max: 100}}},
    'correct.length.boolean': {value: false, rule: {length: {max: 100}}},
    'correct.length.fun': {value: new Function(), rule: {length: {max: 100}}},

    'correct.boolean': {value: 'false', rule: {boolean: true}},
    'correct.regexp': {value: '123456', rule: {regexp: /^[0-9]*$/}},
    'correct.array.1': {value: [], rule: {array: true}},
    'correct.array.2': {value: "[]", rule: {array: true}},
    'correct.array.3': {value: "item", rule: {array: true}},
    'correct.array.children': {value: ['1', '2', 'false'], rule: {array: true, children: {string: true}}},
    'correct.array.children.object': {
        value: [{name: 'DG', age: 18}, {name: 'LF', age: 20}],
        rule: {
            array: {min: 1, max: 10},
            children: {
                object: true,
                children: {
                    name: {string: true},
                    age: {int: {min: 1, max: 99}}
                }
            }
        }
    },
    'correct.array.children.filter': {
        value: [{name: 'DG', age: 18}, {name: 'LF', nickname: 'OMG'}],
        rule: {
            array: {min: 1, max: 10},
            children: {
                object: true,
                children: {
                    name: {string: true},
                    age: {int: {min: 1, max: 99}}
                }
            }
        }
    },
    'correct.object.1': {value: {}, rule: {object: true}},
    'correct.object.2': {value: '{"Json": true}', rule: {object: true}},
    'correct.object.children': {
        value: {name: 'DG', age: 18},
        rule: {
            object: true,
            children: {
                name: {string: true},
                age: {int: {min: 1, max: 99}}
            }
        }
    },
    'correct.object.children.required': {
        value: {name: 'DG'},
        rule: {
            object: true,
            children: {
                name: {string: true},
                age: {int: {min: 1, max: 10}, required: false}
            }
        }
    },


    // ==========


    'fail.required': {value: '', rule: {string: true, required: true}},

    'fail.equals': {value: 'abc', rule: {string: true, equals: 'fail.required'}},
    'fail.different': {value: 'abc', rule: {string: true, different: 'fail.equals'}},
    'fail.alpha': {value: 'abcABC*', rule: {string: true, alpha: true}},
    'fail.alphaDash': {value: 'abcABC_*', rule: {string: true, alphaDash: true}},
    'fail.alphaNumeric': {value: 'abcABC0123456789*', rule: {string: true, alphaNumeric: true}},
    'fail.alphaNumericDash': {value: 'abcABC_0123456789*', rule: {string: true, alphaNumericDash: true}},

    'fail.contains': {value: 'bcd', rule: {contains: 'a'}},
    'fail.base64': {value: 'aHR0cHMlM0EvL3d3dy5ucG1qcy5jb20', rule: {base64: true}},
    'fail.base64.url': {value: 'aHR0cHMlM0EvL3d3dy5ucG1qcy5jb20=', rule: {base64: {url: true}}},

    'fail.date': {value: '2021+09+10', rule: {date: true}},
    'fail.iso8601.1': {value: '2009-02-01 12:00:00', rule: {iso8601: true}},
    'fail.iso8601.2': {value: '2009-02-29T12:00:00', rule: {iso8601: true}},
    'fail.iso8601.3': {value: '10-02-2020T12:00:00', rule: {iso8601: true}},

    'fail.mobile.1': {value: '28076644960', rule: {mobile: 'zh-CN'}},
    'fail.mobile.2': {value: '+86018076644960', rule: {mobile: 'zh-CN'}},
    'fail.email': {value: 'abc@ddd_com', rule: {email: true}},
    'fail.lowercase': {value: 'aBc', rule: {lowercase: true}},
    'fail.uppercase': {value: 'AbC', rule: {uppercase: true}},

    'fail.hexColor.1': {value: '#6', rule: {hexColor: true}},
    'fail.hexColor.2': {value: '#66', rule: {hexColor: true}},
    'fail.rgbColor.1': {value: 'rgb(0,10,256)', rule: {rgbColor: true}},
    'fail.rgbColor.2': {value: 'rgb(0,10,50%)', rule: {rgbColor: true}},
    'fail.rgbColor.3': {value: 'rgba(0,10,255,1.5)', rule: {rgbColor: true}},

    'fail.ip.4': {value: '192.168.0.256', rule: {ip: 4}},
    'fail.ip.6': {value: '2001:0db8:86a3:08d3:1319:8a2e:0370', rule: {ip: 6}},
    'fail.uuid.4': {value: '144d622b-e83a-40ea-8ca1-66af8a86261', rule: {uuid: 4}},
    'fail.md5': {value: 'c520855f2515dbc13084c2ab5a8abfs_', rule: {md5: true}},
    'fail.hash.md5': {value: 'c520855f2515dbc13084c2ab5a8abfs_', rule: {hash: 'md5'}},
    'fail.mimeType': {value: 'image/*', rule: {mimeType: true}},

    'fail.in': {value: false, rule: {in: [1, 'false', true]}},
    'fail.notIn': {value: 1, rule: {notIn: [1, 'false', true]}},
    'fail.checkbox': {value: [1, 2, 3, 6], rule: {checkbox: [1, 2, 3, 4, 5]}},
    'fail.checkbox:repeat': {value: [1, 2, 3, 3], rule: {checkbox: [1, 2, 3, 4, 5]}},

    'fail.int': {value: {}, rule: {int: true}},
    'fail.int.min': {value: 10, rule: {int: {min: 15}}},
    'fail.int.max': {value: 10, rule: {int: {max: 5}}},
    'fail.int.gt': {value: 5, rule: {int: {gt: 10}}},
    'fail.int.lt': {value: 15, rule: {int: {lt: 10}}},

    'fail.float': {value: 'abc', rule: {float: true}},
    'fail.float.min': {value: '5.555', rule: {float: {min: 6}}},
    'fail.float.max': {value: '5.555', rule: {float: {max: 5}}},
    'fail.float.gt': {value: '5.555', rule: {float: {gt: 10}}},
    'fail.float.lt': {value: '5.555', rule: {float: {lt: 5}}},
    'fail.float.decimal': {value: '5.555', rule: {float: {decimal: 2}}},

    'fail.length.string': {value: '5', rule: {string: true, length: 5}},
    'fail.length.string.min': {value: '555', rule: {string: true, length: {min: 5}}},
    'fail.length.string.max': {value: '555', rule: {string: true, length: {max: 2}}},
    'fail.length.object': {value: {a: 1}, rule: {length: {max: 10}}},

    'fail.boolean': {value: 'not boolean', rule: {boolean: true}},
    'fail.regexp': {value: '123a', rule: {regexp: /^[0-9]*$/}},

    'fail.array.min': {value: ['item'], rule: {array: {min: 2}}},
    'fail.array.max': {value: ['item', 'item', 'item'], rule: {array: {max: 2}}},
    'fail.array.children': {value: ['1', '2', false], rule: {array: true, children: {string: true}}},
    'fail.array.children.object': {
        value: [{name: 'DG', age: 18}, {name: 'LF', age: 20}],
        rule: {
            array: {min: 1, max: 10},
            children: {
                object: true,
                children: {
                    name: {string: true},
                    age: {int: {min: 1, max: 19}}
                }
            }
        }
    },
    'fail.object.1': {value: false, rule: {object: true}},
    'fail.object.2': {value: "{}.", rule: {object: true}},
    'fail.object.3': {value: "{ab: 1}", rule: {object: true}},
    'fail.object.children': {
        value: {name: 'DG', age: 18},
        rule: {
            object: true,
            children: {
                name: {string: true},
                age: {int: {min: 1, max: 10}}
            }
        }
    },
    'fail.object.children.required': {
        value: {name: 'DG'},
        rule: {
            object: true,
            children: {
                name: {string: true},
                age: {int: {min: 1, max: 10}, required: true}
            }
        }
    }
}

const examiner = new Validator()
const values = {}
const rules = {}
const messages = {}
for (const key in data) {
    const {value, rule} = data[key]
    values[key] = value
    rules[key] = rule
}
const res = examiner.checkup(rules, values, {messages})


// eslint-disable-next-line no-console
console.table(res.errors)
// eslint-disable-next-line no-console
console.log(res.result)

describe('规则测试', () => {

    describe('字符串格式转化', () => {
        it('string => int', () => assert(typeof res.result['correct.parse.string.int'] === 'number'))
        it('string => float', () => assert(typeof res.result['correct.parse.string.float'] === 'number'))
        it('string => boolean', () => assert(typeof res.result['correct.parse.string.boolean'] === 'boolean'))
        it('number => string', () => assert(typeof res.result['correct.parse.number.string'] === 'string'))
        it('string => array', () => assert(typeof res.result['correct.parse.string.array'] === 'object' && res.result['correct.parse.string.array'].length >= 0))
        it('string => object', () => assert(typeof res.result['correct.parse.string.object'] === 'object'))
        it('children | string => object', () => assert(typeof res.result['correct.parse.children.string.int'].age === 'number'))
    })

    const ruleKeys = Object.keys(Rules)
    const ruleValidKeys = ruleKeys.filter(name => name[0] !== '_')
    const ruleNormalKeys = ruleValidKeys.filter(name => name.indexOf('required') !== 0)
    const total = Object.keys(data).length

    describe(`所有字段共计: ${total}, 所有规则总计: ${ruleKeys.length} (有效规则: ${ruleValidKeys.length}, 普通规则: ${ruleNormalKeys.length}, 辅助规则: ${ruleKeys.length - ruleValidKeys.length})`, () => {

        const successTotal = Object.keys(data).filter(row => row.indexOf('correct') === 0).length
        const successValidTotal = Object.keys(data).filter(row => row.indexOf('correct') === 0 && (data[row].value || row === 'correct.empty.string.array' || data[row].value === false || data[row].value === null)).length
        const successReal = Object.keys(res.result).length
        it(`验证合法匹配: ${successReal}/${successValidTotal}/${successTotal}`, () => {
            assert(successReal === successValidTotal)
        })

        const errorsTotal = Object.keys(data).filter(row => row.indexOf('fail') === 0).length
        const errorsReal = Object.keys(res.errors).length
        it(`验证非法匹配: ${errorsReal}/${errorsTotal}`, () => {
            assert(errorsReal === errorsTotal)
        })

    })
})

module.exports = {
    data
}