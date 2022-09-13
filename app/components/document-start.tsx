import { useState, useRef, LegacyRef } from 'react';

export default function DocumentStart() {
  const [hasRead, _] = useState(false);
  const ref = useRef<HTMLDivElement | null>(null);

  return (
    <div className="flex h-full flex-col space-y-4 divide-y divide-gray-200 overflow-y-auto border-4 border-green-400 p-4">
      <div className="pt-4">
        <h1>Toepassing</h1>
      </div>
      <div className="flex flex-col pt-4">
        <h1>Bekwaamheid</h1>
        <div className="text-3xl">
          <i className="far fa-circle-check text-green-600"></i>
          <i className="far fa-circle-question text-amber-600"></i>
          <i className="far fa-circle-xmark text-red-600"></i>
        </div>
        <div className="text-3xl">
          <i className="fas fa-thumbs-up text-green-600"></i>
          <i className="fas fa-hand-point-up text-amber-600"></i>
          <i className="fas fa-hand text-red-600"></i>
        </div>
      </div>
      <div className="pt-4">
        <h1>Doelen</h1>
      </div>
      <div className="pt-4">
        <h1>Waar op letten?</h1>
        <ul>
          <li>
            Zorg voor een betrouwwbare aanleg van het infuus, bij twijfel altijd
            overleggen met een collega.
          </li>
          <li>
            De nieuwe naalden van BD prikken iets stugger, pas op niet door het
            vat te schieten.
          </li>
        </ul>
      </div>
      <div className="pt-4">
        <h1>Toepassing</h1>
      </div>
      <div className="flex flex-col pt-4">
        <h1>Bekwaamheid</h1>
        <div className="text-3xl">
          <i className="far fa-circle-check text-green-600"></i>
          <i className="far fa-circle-question text-amber-600"></i>
          <i className="far fa-circle-xmark text-red-600"></i>
        </div>
        <div className="text-3xl">
          <i className="fas fa-thumbs-up text-green-600"></i>
          <i className="fas fa-hand-point-up text-amber-600"></i>
          <i className="fas fa-hand text-red-600"></i>
        </div>
      </div>
      <div className="pt-4">
        <h1>Doelen</h1>
      </div>
      <div className="pt-4">
        <h1>Waar op letten?</h1>
        <ul>
          <li>
            Zorg voor een betrouwwbare aanleg van het infuus, bij twijfel altijd
            overleggen met een collega.
          </li>
          <li>
            De nieuwe naalden van BD prikken iets stugger, pas op niet door het
            vat te schieten.
          </li>
        </ul>
      </div>
      <div className="pt-4">
        <h1>Toepassing</h1>
      </div>
      <div className="flex flex-col pt-4">
        <h1>Bekwaamheid</h1>
        <div className="text-3xl">
          <i className="far fa-circle-check text-green-600"></i>
          <i className="far fa-circle-question text-amber-600"></i>
          <i className="far fa-circle-xmark text-red-600"></i>
        </div>
        <div className="text-3xl">
          <i className="fas fa-thumbs-up text-green-600"></i>
          <i className="fas fa-hand-point-up text-amber-600"></i>
          <i className="fas fa-hand text-red-600"></i>
        </div>
      </div>
      <div className="pt-4">
        <h1>Doelen</h1>
      </div>
      <div className="pt-4">
        <h1>Waar op letten?</h1>
        <ul>
          <li>
            Zorg voor een betrouwwbare aanleg van het infuus, bij twijfel altijd
            overleggen met een collega.
          </li>
          <li>
            De nieuwe naalden van BD prikken iets stugger, pas op niet door het
            vat te schieten.
          </li>
        </ul>
      </div>
      <div className="pt-4">
        <h1>Toepassing</h1>
      </div>
      <div className="flex flex-col pt-4">
        <h1>Bekwaamheid</h1>
        <div className="text-3xl">
          <i className="far fa-circle-check text-green-600"></i>
          <i className="far fa-circle-question text-amber-600"></i>
          <i className="far fa-circle-xmark text-red-600"></i>
        </div>
        <div className="text-3xl">
          <i className="fas fa-thumbs-up text-green-600"></i>
          <i className="fas fa-hand-point-up text-amber-600"></i>
          <i className="fas fa-hand text-red-600"></i>
        </div>
      </div>
      <div className="pt-4">
        <h1>Doelen</h1>
      </div>
      <div className="pt-4" ref={ref}>
        <h1>Waar op letten?</h1>
        <ul>
          <li>
            Zorg voor een betrouwwbare aanleg van het infuus, bij twijfel altijd
            overleggen met een collega.
          </li>
          <li>
            De nieuwe naalden van BD prikken iets stugger, pas op niet door het
            vat te schieten.
          </li>
        </ul>
      </div>
    </div>
  );
}
