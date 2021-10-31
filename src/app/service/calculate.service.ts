import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CalculateService {

  constructor() { }

  /**
   * @description : 문자열 유사도 확인
   */
  getSimilarity(original: string, matches: string[]) {
    let originalArr:string[];
    let resultCnt: number = 0;
    let max = 0;
    let sentence: string = '';
    for (let i = 0; i < matches.length; i++){
      const matchesArr = matches[i].replace(/\.|\?|\,/, '').split(' ');
      resultCnt = 0;
      originalArr = original.split(' ');
      for (let j = 0; j < matchesArr.length; j++){
        for (let k = 0; k < originalArr.length; k++){
          if (matchesArr[j].toLocaleLowerCase() === originalArr[k].replace(/\.|\?|\,/, ' ').toLocaleLowerCase()) {
            originalArr[k] = `<b>${originalArr[k]}</b>`
            resultCnt++;
            break;
          }
        }
      }
      
      const percent = Math.floor((resultCnt / originalArr.length) * 100);
      
      if (percent > max) {
        max = percent;
        sentence = originalArr.join(' ');
      }
    }

    return { max , sentence }
  }

  /**
   * @description : 유사도가 가장 낮은 문장 3개 추출
   */
  getMinSimilarity(original: string, matches: string[]) {
    let originalArr:string[];
    let resultCnt: number = 0;
    let max: number = 0;
    let sentence: string = '';
    for (let i = 0; i < matches.length; i++){
      const matchesArr = matches[i].replace(/\.|\?|\,/, '').split(' ');
      resultCnt = 0;
      originalArr = original.split(' ');
      for (let j = 0; j < matchesArr.length; j++){
        for (let k = 0; k < originalArr.length; k++){
          if (matchesArr[j].toLocaleLowerCase() === originalArr[k].replace(/\.|\?|\,/, ' ').toLocaleLowerCase()) {
            resultCnt++;
            break;
          }
        }
      }
      
      const percent = Math.floor((resultCnt / originalArr.length) * 100);
      
      if (percent > max) {
        max = percent;
        sentence = matches[i];
      }
    }

    /* /\.|\,|\?/g */
    const splitOriginal: string[] = original.split(/\.|\,|\?/g);
    const maxSentence: string[] = sentence.split(' ');
    const similarityArr = Array(splitOriginal.length);
    for (let i = 0; i < splitOriginal.length; i++){
      const tempArr = splitOriginal[i].split(' ');
      let resultCnt = 0;
      for (let j = 0; j < tempArr.length; j++){
        for (let k = 0; k < maxSentence.length; k++){
          if (tempArr[j].replace(/\.|\,|\?/g, ' ').toLocaleLowerCase() === maxSentence[k].replace(/\.|\,|\?/g, ' ').toLocaleLowerCase()) {
            resultCnt++;
            tempArr[j] =`<b>${tempArr[j]}</b>`
            break;
          }
        }
      }

      const percent = Math.floor((resultCnt / tempArr.length) * 100);
      const simirityInfo = Object.create({}, { simlarity: { value: percent }, sentence: { value: tempArr.join(' ') } });

      similarityArr[i] = simirityInfo;
    }

    
    const sorting = similarityArr.sort((a, b) => {
      return a.simlarity - b.simlarity;
    });

    return sorting.slice(0, 3);
  }
}
