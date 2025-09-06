
export const createTextImageAsBase64 = (text: string, width = 1080, height = 1080): Promise<string> => {
    return new Promise((resolve, reject) => {
      try {
        const canvas = document.createElement('canvas');
        canvas.width = width;
        canvas.height = height;
        const context = canvas.getContext('2d');
  
        if (!context) {
          return reject(new Error('Não foi possível obter o contexto 2D do canvas.'));
        }
  
        // Fundo branco
        context.fillStyle = 'white';
        context.fillRect(0, 0, width, height);
  
        // Configurações do texto
        context.fillStyle = 'black';
        context.textAlign = 'center';
        context.textBaseline = 'middle';
        
        // Lógica para ajustar o tamanho da fonte
        let fontSize = 120;
        context.font = `bold ${fontSize}px sans-serif`;

        const words = text.split(' ');
        let line = '';
        const lines = [];

        for(let n = 0; n < words.length; n++) {
            let testLine = line + words[n] + ' ';
            let metrics = context.measureText(testLine);
            let testWidth = metrics.width;
            if (testWidth > width * 0.9 && n > 0) {
                lines.push(line);
                line = words[n] + ' ';
            } else {
                line = testLine;
            }
        }
        lines.push(line);

        // Ajusta o tamanho da fonte se houver muitas linhas
        if (lines.length > 3) {
            fontSize = 80;
        } else if (lines.length > 2) {
            fontSize = 100;
        }

        context.font = `bold ${fontSize}px sans-serif`;

        const lineHeight = fontSize * 1.2;
        const startY = height / 2 - (lines.length - 1) * lineHeight / 2;

        for (let i = 0; i < lines.length; i++) {
            context.fillText(lines[i].trim(), width / 2, startY + i * lineHeight);
        }
  
        // Converte para base64
        const base64Image = canvas.toDataURL('image/png').split(',')[1];
        resolve(base64Image);
      } catch (error) {
        reject(error);
      }
    });
  };
