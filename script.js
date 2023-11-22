//import '/app/config/config.js';
//import HgApi from '/app/modules/hg-api.js';

const HG_API_KEY = '106016e0';
class HgApi {
    
    constructor(api_key, error_code){
        if (api_key != null){
            this._api_key = api_key;
        }
        this._error_code = error_code;
    }

    
    isError (){
        return this._error_code;
    }
    

    async request(endpoint) {
        let uri = `https://api.hgbrasil.com/${endpoint}?key=${this._api_key}&format=json-cors`;
        
        try {
            const response = await fetch(uri);
            const data = await response.json();
            this._error = false;
            return data;
        } catch (error) {
            console.error('An error occurred:', error);
            this.error = true;
            return false; 
        }
        
    }

    async getQuotation(currency) {
        const data = await this.request('finance/quotations');
        
        if (data && data.results && data.results.currencies) {
            this.error = false;
            switch(currency) {
                case 'usd':
                  return data.results.currencies.USD;
                  break;
                case 'eur':
                  return data.results.currencies.EUR;
                  break;
                case 'gbp':
                  return data.results.currencies.GBP;
                  break;
                case 'aud':
                  return data.results.currencies.AUD;
                  break;
                default:
                  return 'Moeda Inválida';
              }
            
        } else {
            this.error = true;
            return false;
        }
    }
    
}


document.addEventListener('DOMContentLoaded', async function () {
    
    let hg = new HgApi(HG_API_KEY);

    let dollar = await hg.getQuotation('usd');
    let euro = await hg.getQuotation('eur');
    let pound = await hg.getQuotation('gbp');
    let australian_dollar = await hg.getQuotation('aud');

    var usdMessageElement = document.getElementById('usd');
    var eurMessageElement = document.getElementById('eur');
    var gbpMessageElement = document.getElementById('gbp');
    var audMessageElement = document.getElementById('aud');
    
    usdMessageElement.textContent = `Buy rate of USD: ${dollar.buy}`;
    eurMessageElement.textContent = `Buy rate of EUR: ${euro.buy}`;
    gbpMessageElement.textContent = `Buy rate of GBP: ${pound.buy}`;
    audMessageElement.textContent = `Buy rate of AUD: ${australian_dollar.buy}`;


});


