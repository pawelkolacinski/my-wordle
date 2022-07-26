import './LetterGrid.css'

export default function LetterGrid({data, rows=6, cols=5}) {
  
  //here we add empty values to fill whole grid 
  
  const gridLetters = [...data]
  
  const emptyLettersCount = rows*cols-data.length
  
 
  if(emptyLettersCount >0) {
        for(let i=0; i<emptyLettersCount;i++) {
            gridLetters.push({text:''})
        }
    }  

  
  
    return (
    <div 
        className="letter-grid" 
        style={{
            gridTemplateRows:`repeat(${rows},1fr)`,
            gridTemplateColumns:`repeat(${cols},1fr)`,
            }} 
    >
        {gridLetters.map((letter,index) => 
            <div key={index} className={`letter ${letter.className ?? ''}`}>
                
                    {letter.text}
                
            </div>)}

    </div>
  )
}
