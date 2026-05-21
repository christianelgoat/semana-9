import React from 'react';

export interface Flashcard {
  id: string;
  front: string;
  back: string;
}

export interface QuizQuestion {
  id: string;
  question: string;
  options: string[];
  correctAnswerIndex: number;
  explanation: string;
}

export interface ComplexCase {
  id: string;
  title: string;
  company: string;
  context: string[];
  strategy: string[];
  impact: string[];
  keyInsight: string;
  questions?: QuizQuestion[];
}

export interface ChartData {
  name: string;
  [key: string]: string | number;
}

export interface TableColumn {
  header: string;
  accessor: string;
}

export interface TableRow {
  [key: string]: string | number;
}

export interface TheorySectionData {
  id: string;
  heading: string;
  content?: React.ReactNode | string; 
  paragraphs?: string[];
  type: 'text' | 'chart' | 'table' | 'image' | 'grid';
  chartData?: ChartData[];
  chartKeys?: string[];
  chartColors?: string[];
  tableColumns?: TableColumn[];
  tableData?: TableRow[];
  gridItems?: { title: string; desc: string; icon?: string }[];
  imageUrl?: string;
  imageCaption?: string;
  quote?: { text: string; author: string };
}

