import * as express from 'express'
import * as puppeteer from 'puppeteer'
import * as qs from 'query-string'
import { BASE_URL } from '../../common/constants'
import log from '../../common/log'

export default function() {
  const router = express.Router()

  router.get('*', async (req, res) => {
    try {
      const browser = await puppeteer.launch()
      const page = await browser.newPage()

      const path = req.params[0]
      const query = qs.stringify(req.query)

      await page.goto(`${BASE_URL}${path}?${query}`)

      const buffer = await page.pdf({ format: 'A4' })

      res.type('application/pdf')
      res.send(buffer)

      browser.close()
    } catch (e) {
      log.error('routes/pdf', e)
      res
        .status(500)
        .send({ status: 'failed_to_render_pdf', message: e.message })
    }
  })

  return router
}
