const util = require('../utils/util');

async function sleep(ms) {
    await new Promise(r => setTimeout(r, ms));
}

exports.teste = async (req, res) => {
    console.log(`TesteController.index [${req.method}]`);
    console.log(req.params.param1);
    console.log("diretório raiz da aplicação: ", await util.getPkgJsonDir());
    const tempo_inicio = new Date();
    await sleep(3000);
    const tempo_gasto = (new Date() - tempo_inicio) / 1000;
    res.status(200).json({ tempo_gasto, 'param': req.params.param1, texto_fixo: 'teste 7' });
}

exports.seguro = async (req, res) => {
    console.log(`TesteController.seguro [${req.method}]`);
    res.status(200).json({ mensagem: "Você acessou um ambiente seguro"});
}
