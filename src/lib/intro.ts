/**
 * オープニングを表示するかを決める、<head> に埋め込む短いスクリプト。
 * トップページ・ブラウザを開いてから初めての表示・「視差効果を減らす」設定でない場合だけ表示します。
 * 6秒たっても終わらない場合は、自動で閉じます。
 */
export const INTRO_HEAD_SCRIPT = `(function(){try{var p=location.pathname;if((p==='/'||p==='/index.html')&&!sessionStorage.getItem('introSeen')&&!matchMedia('(prefers-reduced-motion: reduce)').matches){var d=document.documentElement;d.classList.add('intro','intro-hold');setTimeout(function(){d.classList.remove('intro','intro-hold','intro-out')},6000)}}catch(e){}})()`;
