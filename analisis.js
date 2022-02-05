

    const path = require("path");
    const fs = require("fs");
    const arrayFilePath = path.join(__dirname, "Analisis_de_Maniobras.json");
    const comandos = JSON.parse(fs.readFileSync(arrayFilePath, "utf-8"));
   
    var constadorDePositivos = 0
    var constadorDeNegativos = 0
    var constadorDeNegativosTrasitorios = 0
    for (let i = 0; i < comandos.length; i++) {
      const infoComandoEmitido = comandos[i];
      const horaComandoEmitido = Date.parse(comandos[i].field4.charAt(6)+comandos[i].field4.charAt(7)+comandos[i].field4.charAt(8)+comandos[i].field4.charAt(9)+comandos[i].field4.charAt(5)+comandos[i].field4.charAt(3)+comandos[i].field4.charAt(4)+comandos[i].field4.charAt(2)+comandos[i].field4.charAt(0)+comandos[i].field4.charAt(1)+comandos[i].field4.charAt(10)+comandos[i].field4.charAt(11)+comandos[i].field4.charAt(12)+comandos[i].field4.charAt(13)+comandos[i].field4.charAt(14)+comandos[i].field4.charAt(15)+comandos[i].field4.charAt(16)+comandos[i].field4.charAt(17)+comandos[i].field4.charAt(18))
      
      if (infoComandoEmitido.field5.toLowerCase() === "espera resultado") {
      // console.log("estoy en "+ i +" y"+ " La hora del comando emitido es " + (new Date (horaComandoEmitido)))
       
        for (let j = i + 1; j < comandos.length; j++) {
          
          const horaComandoRealizado = Date.parse(comandos[j].field4.charAt(6)+comandos[j].field4.charAt(7)+comandos[j].field4.charAt(8)+comandos[j].field4.charAt(9)+comandos[j].field4.charAt(5)+comandos[j].field4.charAt(3)+comandos[j].field4.charAt(4)+comandos[j].field4.charAt(2)+comandos[j].field4.charAt(0)+comandos[j].field4.charAt(1)+comandos[j].field4.charAt(10)+comandos[j].field4.charAt(11)+comandos[j].field4.charAt(12)+comandos[j].field4.charAt(13)+comandos[j].field4.charAt(14)+comandos[j].field4.charAt(15)+comandos[j].field4.charAt(16)+comandos[j].field4.charAt(17)+comandos[j].field4.charAt(18))
          const esElMismoEquipoParaComparar =           
            comandos[i].field3 === comandos[j].field3;
                
          const fuePositivo = comandos[j].field5
            .toLowerCase()
            .includes("positivo");

          const fueNegativo = comandos[j].field5
            .toLowerCase()
            .includes("negativa");

          const fueIncongruente = comandos[j].field5
            .toLowerCase()
            .includes("incongruencia");
              if (esElMismoEquipoParaComparar && (horaComandoRealizado < horaComandoEmitido + 180000 ) && fueNegativo && fuePositivo) {
                constadorDeNegativosTrasitorios++  
              } else {
                
              }
            

          if (esElMismoEquipoParaComparar && (horaComandoRealizado < horaComandoEmitido + 60000 )) {
            if (fuePositivo || fueIncongruente) {
              constadorDePositivos++
            //  console.log(
            //    `Comando del equipo ${comandos[i]?.field3}: Positivo` + " a la hora " + (new Date (horaComandoRealizado))
            //  );
            } else if (fueNegativo ) {

              constadorDeNegativos++
           //   console.log(
           //     `Comando del equipo ${comandos[i]?.field3}: Negativa` + " a la hora " + (new Date (horaComandoRealizado))
           //   );
           
           //   console.log(
           //     `Comando del equipo ${comandos[i]?.field3}: Negativa` + " a la hora " + (new Date (horaComandoRealizado))
           //   );
            }
          }
        }
        
      }
    }
    console.log(constadorDePositivos + " Positivos")
    console.log(constadorDeNegativos + " Negativos")
    console.log(constadorDeNegativosTrasitorios + "Transitorios")

