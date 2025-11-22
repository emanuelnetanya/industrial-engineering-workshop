import * as GUI from '@babylonjs/gui';

/**
 * יוצר חלון שאלה אינטראקטיבי
 */
export function createQuestionModal(
  advancedTexture: GUI.AdvancedDynamicTexture,
  onCorrectAnswer: () => void
): void {
  const rect = new GUI.Rectangle();
  rect.width = '600px';
  rect.height = '400px';
  rect.background = 'rgba(10, 20, 30, 0.95)';
  rect.color = '#00d2ff';
  rect.thickness = 2;
  rect.cornerRadius = 10;
  advancedTexture.addControl(rect);

  // כותרת
  const title = new GUI.TextBlock();
  title.text = 'SECURITY CHECKPOINT';
  title.color = '#00d2ff';
  title.fontSize = 30;
  title.top = '-150px';
  rect.addControl(title);

  // שאלה
  const questionText = new GUI.TextBlock();
  questionText.text = 'מהי המטרה העיקרית של מתודולוגיית LEAN?';
  questionText.color = 'white';
  questionText.fontSize = 24;
  questionText.textWrapping = true;
  questionText.top = '-80px';
  rect.addControl(questionText);

  // תשובות
  const answers = [
    'הגדלת מלאי',
    'צמצום בזבוז וערך ללקוח', // נכון
    'העסקת יותר עובדים'
  ];

  answers.forEach((answerText, index) => {
    const btn = GUI.Button.CreateSimpleButton(`answer${index}`, answerText);
    btn.width = '500px';
    btn.height = '50px';
    btn.color = 'white';
    btn.background = '#333';
    btn.top = `${20 + index * 70}px`;
    btn.cornerRadius = 5;

    btn.onPointerUpObservable.add(() => {
      if (index === 1) {
        // תשובה נכונה
        btn.background = 'green';
        setTimeout(() => {
          rect.dispose();
          onCorrectAnswer();
        }, 500);
      } else {
        // תשובה שגויה
        btn.background = 'red';
      }
    });

    rect.addControl(btn);
  });
}
