import * as BABYLON from '@babylonjs/core';
import type { GameState, Station } from '../types';

/**
 * מצב המשחק הגלובלי
 */
export const gameState: GameState = {
  isActive: false,
  currentStation: 0,
  isMoving: false,
  walkSpeed: 0.12,
  rotationSpeed: 0.15,
  waitingForInput: false
};

/**
 * תחנות הסיור עם מידע - מותאם למובייל עם מרחקים קצרים יותר
 */
const SCALE = 0.4; // קנה מידה למובייל
export const stations: Station[] = [
  {
    position: new BABYLON.Vector3(0, 0, -50 * SCALE),
    name: 'נקודת התחלה',
    description: 'מחוץ למפעל',
    hasInfo: false
  },
  {
    position: new BABYLON.Vector3(0, 0, -35 * SCALE),
    name: 'כניסה למפעל',
    description: 'שער הכניסה הראשי',
    hasInfo: false
  },
  {
    position: new BABYLON.Vector3(0, 0, -25 * SCALE),
    name: 'לובי קבלה',
    description: 'מרחב קבלת הפנים',
    hasInfo: false
  },
  {
    position: new BABYLON.Vector3(-25 * SCALE, 0, -15 * SCALE),
    name: 'תחנה 1 - מכונת CNC',
    description: 'מכונת כרסום ממוחשבת לעיבוד מתכת',
    hasInfo: true
  },
  {
    position: new BABYLON.Vector3(-25 * SCALE, 0, 5 * SCALE),
    name: 'תחנה 2 - קו ייצור',
    description: 'מסוע אוטומטי להעברת מוצרים',
    hasInfo: true
  },
  {
    position: new BABYLON.Vector3(-25 * SCALE, 5 * SCALE, 25 * SCALE),
    name: 'תחנה 3 - רובוט ריתוך',
    description: 'זרוע רובוטית לריתוך מדויק',
    hasInfo: true
  },
  {
    position: new BABYLON.Vector3(0, 5 * SCALE, 30 * SCALE),
    name: 'גשר עליון',
    description: 'מעבר עליון למפקחים',
    hasInfo: false
  },
  {
    position: new BABYLON.Vector3(25 * SCALE, 5 * SCALE, 25 * SCALE),
    name: 'תחנה 4 - אריזה',
    description: 'מכונה אוטומטית לאריזת מוצרים',
    hasInfo: true
  },
  {
    position: new BABYLON.Vector3(25 * SCALE, 0, 5 * SCALE),
    name: 'תחנה 5 - בקרת איכות',
    description: 'בדיקת איכות ומיון מוצרים',
    hasInfo: true
  },
  {
    position: new BABYLON.Vector3(25 * SCALE, 0, -15 * SCALE),
    name: 'תחנה 6 - מחסן',
    description: 'אחסון חומרי גלם ומוצרים',
    hasInfo: true
  },
  {
    position: new BABYLON.Vector3(0, 0, -25 * SCALE),
    name: 'יציאה',
    description: 'סיום הסיור',
    hasInfo: false
  },
  {
    position: new BABYLON.Vector3(0, 0, -35 * SCALE),
    name: 'שער יציאה',
    description: 'יציאה מהמפעל',
    hasInfo: false
  },
  {
    position: new BABYLON.Vector3(0, 0, -50 * SCALE),
    name: 'סיום',
    description: 'תודה על הסיור!',
    hasInfo: false
  }
];
