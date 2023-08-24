const fs = require('fs')
const XLSX = require('xlsx')

const readXlsxFile = function (filePath) {
  // 读取Excel文件
  const workbook = XLSX.readFile(filePath)

  // 选择要读取的工作表（默认选择第一个工作表）
  const sheetName = workbook.SheetNames[0]
  const sheet = workbook.Sheets[sheetName]

  // 将工作表中的数据转换成JSON格式
  const data = XLSX.utils.sheet_to_json(sheet)

  return data
}

const ZH = '中文'
const EN = '英文'
const START = 1560

const generateLocaleFile = function (filePath, start = START) {
  const data = readXlsxFile(filePath)
  const zh = {}
  const en = {}

  data.forEach((item, index) => {
    const key = `all.autotext${index + start}`
    zh[key] = item[ZH]
    en[key] = item[EN]
  })

  const zhContent = JSON.stringify(zh, null, 2)
  const enContent = JSON.stringify(en, null, 2)

  fs.writeFileSync('output/zh.json', zhContent)
  fs.writeFileSync('output/en.json', enContent)
}

generateLocaleFile('source/locales.xlsx')
