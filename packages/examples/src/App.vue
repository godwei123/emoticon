<script setup lang="ts">
import {
  AntHighContrast, FaceExhalingHighContrast, FaceHoldingBackTearsHighContrast,
  FaceSavoringFoodHighContrast, FaceWithSymbolsOnMouthHighContrast, GrinningFaceHighContrast,
  IconoirProvider, KnockedOutFaceHighContrast,
  SmilingFaceWithSmilingEyesColor,
  WearyFaceHighContrast
} from "emoticon-vue";
</script>

<template>
  <h1>hello</h1>

  <IconoirProvider :iconProps="{
    width: '200',
    height: '200',

  }">
    <AntHighContrast width="100" height="100"></AntHighContrast>
    <FaceSavoringFoodHighContrast width="100" height="100"></FaceSavoringFoodHighContrast>
    <FaceHoldingBackTearsHighContrast width="100" height="100"></FaceHoldingBackTearsHighContrast>
    <FaceWithSymbolsOnMouthHighContrast width="100" height="100"></FaceWithSymbolsOnMouthHighContrast>
    <KnockedOutFaceHighContrast width="100" height="100"></KnockedOutFaceHighContrast>
    <FaceExhalingHighContrast width="100" height="100"></FaceExhalingHighContrast>
    <GrinningFaceHighContrast width="100" height="100"></GrinningFaceHighContrast>
    <WearyFaceHighContrast width="100" height="100"></WearyFaceHighContrast>
    <FaceSavoringFoodHighContrast width="100" height="100"></FaceSavoringFoodHighContrast>
    <SmilingFaceWithSmilingEyesColor fill="none"></SmilingFaceWithSmilingEyesColor>
    <WearyFaceHighContrast></WearyFaceHighContrast>
  </IconoirProvider>
</template>
