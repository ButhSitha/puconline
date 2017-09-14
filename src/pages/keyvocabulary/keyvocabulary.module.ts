import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { KeyvocabularyPage } from './keyvocabulary';

@NgModule({
  declarations: [
    KeyvocabularyPage,
  ],
  imports: [
    IonicPageModule.forChild(KeyvocabularyPage),
  ],
})
export class KeyvocabularyPageModule {}
