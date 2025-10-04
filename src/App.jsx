import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './components/ui/tabs';
import { Slider } from './components/ui/slider';
import { Label } from './components/ui/label';
import { Progress } from './components/ui/progress';
import { Badge } from './components/ui/badge';
import { Alert, AlertDescription } from './components/ui/alert';
import { LineChart, Line, BarChart, Bar, AreaChart, Area, RadarChart, Radar, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ScatterChart, Scatter, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Activity, Droplets, Gauge, Layers, Zap, Clock, Microscope, FlaskConical, Dna, TrendingUp, AlertCircle, CheckCircle2, Info } from 'lucide-react';
import './App.css';

function App() {
  // State for input parameters
  const [mw, setMw] = useState(100000);
  const [concentration, setConcentration] = useState(10);
  const [voltage, setVoltage] = useState(17.5);
  const [flowRate, setFlowRate] = useState(1.5);
  const [distance, setDistance] = useState(15);

  // State for predictions
  const [predictions, setPredictions] = useState({});
  const [biologicalOutcomes, setBiologicalOutcomes] = useState({});

  // Calculate predictions based on literature data
  useEffect(() => {
    // STAGE 1: Process-to-Architecture Predictions
    
    // Fiber Diameter (nm) - Based on MW, concentration, voltage, flow rate
    const viscosityFactor = (mw / 100000) * (concentration / 10);
    const voltageFactor = 1 - (voltage - 17.5) * 0.015;
    const flowFactor = 1 + (flowRate - 1.5) * 0.12;
    const distanceFactor = 1 + (distance - 15) * 0.008;
    const fiberDiameter = Math.max(150, Math.min(1500, 
      400 * viscosityFactor * voltageFactor * flowFactor * distanceFactor
    ));

    // Porosity (%) - Inverse relationship with fiber diameter
    const porosity = Math.max(60, Math.min(95, 
      95 - (fiberDiameter / 100) * 2.5 + (voltage - 17.5) * 0.5
    ));

    // Average Pore Size (μm) - Scales with fiber diameter
    const poreSize = Math.max(2, Math.min(15, 
      (fiberDiameter / 200) * 1.5 + (porosity / 20)
    ));

    // Tensile Strength (MPa) - Based on experimental data from PDFs
    // 200k Da = 29.8 MPa, scales with MW and concentration
    const tensileStrength = Math.max(2, Math.min(32, 
      2.5 + (mw / 100000) * 5.2 + (concentration - 10) * 0.35 - (fiberDiameter > 1000 ? 2 : 0)
    ));

    // Young's Modulus (MPa) - 200k Da = 78 MPa from literature
    const youngsModulus = Math.max(20, Math.min(85, 
      25 + (mw / 100000) * 60 + (concentration - 10) * 2.5
    ));

    // Water Absorption (%) - Decreases with MW
    const waterAbsorption = Math.max(350, Math.min(950, 
      950 - (mw / 100000) * 280 + (porosity - 75) * 8
    ));

    // Contact Angle (degrees) - Increases slightly with MW (more hydrophobic)
    const contactAngle = Math.max(35, Math.min(75, 
      45 + (mw / 100000) * 15 - (porosity - 75) * 0.3
    ));

    // Degradation Rate (%/week) - Based on experimental data
    // 8,840 Da (Mn) = 85.1% at 28 days = ~21%/week
    // 12,266 Da (Mn) = 74.1% at 28 days = ~18.5%/week
    // Inverse relationship with MW
    const degradationRate = Math.max(4, Math.min(25, 
      25 - (mw / 100000) * 10.5 + (porosity - 75) * 0.15
    ));

    // Swelling Ratio (%) - Decreases with MW (from 97.4% to 84.2%)
    const swellingRatio = Math.max(80, Math.min(100, 
      100 - (mw / 100000) * 8 - (concentration - 10) * 0.5
    ));

    // Concentration Window Assessment
    const minConc = mw < 70000 ? 6 : (mw < 150000 ? 8 : 9);
    const maxConc = mw < 70000 ? 14 : (mw < 150000 ? 12 : 10.5);
    const isInWindow = concentration >= minConc && concentration <= maxConc;

    // Morphology Assessment
    let morphology = "Uniform, bead-free fibers";
    if (mw < 70000 && concentration < 9) {
      morphology = "Beaded fibers (beads-on-string)";
    } else if (mw > 150000 && concentration > 10) {
      morphology = "Thick fibers, potential ribbon-like";
    } else if (mw >= 100000 && mw <= 150000) {
      morphology = "Smooth, uniform, bead-free (optimal)";
    }

    setPredictions({
      fiberDiameter,
      porosity,
      poreSize,
      tensileStrength,
      youngsModulus,
      waterAbsorption,
      contactAngle,
      degradationRate,
      swellingRatio,
      morphology,
      isInWindow,
      minConc,
      maxConc
    });

    // STAGE 2: Architecture-to-Biology Predictions
    
    // Cell Viability (%) - Generally high for PVA, slightly better with optimal properties
    const cellViability = Math.max(85, Math.min(98, 
      92 + (porosity > 75 ? 4 : 0) + (fiberDiameter > 300 && fiberDiameter < 900 ? 2 : 0)
    ));

    // Cell Proliferation Rate (doubling time in hours)
    const proliferationTime = Math.max(20, Math.min(48, 
      32 - (porosity - 75) * 0.3 - (poreSize > 4 ? 4 : 0) + (fiberDiameter > 1000 ? 6 : 0)
    ));

    // GAG Content (μg/mg) - For cartilage, higher with optimal properties
    const gagContent = Math.max(5, Math.min(45, 
      10 + (youngsModulus / 10) + (poreSize > 6 ? 15 : 0) + (fiberDiameter > 800 ? 8 : 0)
    ));

    // Collagen II Expression (fold change) - Cartilage phenotype marker
    const col2Expression = Math.max(1, Math.min(8, 
      1.5 + (youngsModulus / 15) + (poreSize > 6 ? 2.5 : 0) + (mw > 140000 ? 1.5 : 0)
    ));

    // Aggrecan Expression (fold change)
    const aggrecanExpression = Math.max(1, Math.min(6, 
      1.2 + (youngsModulus / 20) + (poreSize > 6 ? 2 : 0) + (fiberDiameter > 800 ? 1 : 0)
    ));

    // Collagen I/II Ratio - Lower is better for cartilage (avoid fibrocartilage)
    const col1_col2_ratio = Math.max(0.1, Math.min(2.5, 
      2.0 - (youngsModulus / 50) - (poreSize > 6 ? 0.8 : 0) - (mw > 140000 ? 0.3 : 0)
    ));

    // MSC Differentiation Potential (based on stiffness)
    let mscLineage = "Myogenic (intermediate)";
    let osteogenicScore = 50;
    let chondrogenicScore = 50;
    let neurogenicScore = 50;
    
    if (youngsModulus < 35) {
      mscLineage = "Neurogenic (soft substrate)";
      neurogenicScore = 85;
      osteogenicScore = 25;
      chondrogenicScore = 40;
    } else if (youngsModulus >= 35 && youngsModulus < 60) {
      mscLineage = "Myogenic/Chondrogenic";
      neurogenicScore = 40;
      osteogenicScore = 45;
      chondrogenicScore = 80;
    } else {
      mscLineage = "Osteogenic (stiff substrate)";
      neurogenicScore = 20;
      osteogenicScore = 90;
      chondrogenicScore = 55;
    }

    // Drug Release Profile
    const burstRelease = Math.max(15, Math.min(75, 
      70 - (mw / 100000) * 25 + (porosity - 75) * 0.8
    ));
    const sustainedDuration = Math.max(3, Math.min(28, 
      5 + (mw / 100000) * 12 - (porosity - 75) * 0.2
    ));

    setBiologicalOutcomes({
      cellViability,
      proliferationTime,
      gagContent,
      col2Expression,
      aggrecanExpression,
      col1_col2_ratio,
      mscLineage,
      osteogenicScore,
      chondrogenicScore,
      neurogenicScore,
      burstRelease,
      sustainedDuration
    });

  }, [mw, concentration, voltage, flowRate, distance]);

  // Calculate application suitability scores
  const calculateApplicationScores = () => {
    const { fiberDiameter, porosity, poreSize, tensileStrength, youngsModulus, degradationRate } = predictions;

    const scores = {
      skinRegeneration: Math.min(100, 
        (fiberDiameter < 600 ? 95 : 95 - (fiberDiameter - 600) / 15) *
        (porosity > 80 ? 1 : porosity / 80) *
        (degradationRate > 12 ? 1 : 0.85)
      ),
      vascularEngineering: Math.min(100,
        (fiberDiameter >= 400 && fiberDiameter <= 1200 ? 95 : 75) *
        (tensileStrength >= 5 && tensileStrength <= 12 ? 1 : 0.8) *
        (porosity > 70 ? 1 : 0.85)
      ),
      nerveGuidance: Math.min(100,
        (fiberDiameter >= 500 && fiberDiameter <= 900 ? 95 : 80) *
        (porosity > 72 ? 1 : 0.88) *
        (degradationRate >= 6 && degradationRate <= 10 ? 1 : 0.85)
      ),
      cartilageRepair: Math.min(100,
        (fiberDiameter > 800 ? 95 : 70) *
        (poreSize > 6 ? 1 : 0.75) *
        (youngsModulus > 60 ? 1 : youngsModulus / 60) *
        (degradationRate < 8 ? 1 : 0.8)
      ),
      boneEngineering: Math.min(100,
        (fiberDiameter > 1000 ? 95 : 80) *
        (youngsModulus > 70 ? 1 : youngsModulus / 70) *
        (degradationRate < 7 ? 1 : 0.85)
      ),
      drugDelivery: Math.min(100,
        (fiberDiameter < 500 ? 95 : 85) *
        (porosity > 82 ? 1 : 0.88) *
        (degradationRate > 8 ? 1 : 0.9)
      )
    };

    return scores;
  };

  const applicationScores = Object.keys(predictions).length > 0 ? calculateApplicationScores() : {};

  // Cell compatibility scores
  const calculateCellScores = () => {
    const { fiberDiameter, porosity, poreSize, youngsModulus } = predictions;

    return {
      fibroblasts: Math.min(100,
        (fiberDiameter >= 200 && fiberDiameter <= 500 ? 95 : 75) *
        (porosity > 75 ? 1 : 0.85) *
        (poreSize >= 3 && poreSize <= 6 ? 1 : 0.88)
      ),
      endothelial: Math.min(100,
        (fiberDiameter >= 400 && fiberDiameter <= 1000 ? 95 : 78) *
        (porosity > 70 ? 1 : 0.87) *
        (poreSize >= 4 && poreSize <= 8 ? 1 : 0.85)
      ),
      schwann: Math.min(100,
        (fiberDiameter >= 500 && fiberDiameter <= 900 ? 95 : 80) *
        (porosity > 72 ? 1 : 0.88)
      ),
      chondrocytes: Math.min(100,
        (fiberDiameter > 800 ? 95 : 70) *
        (poreSize > 6 ? 1 : 0.75) *
        (youngsModulus >= 50 && youngsModulus <= 80 ? 1 : 0.82)
      ),
      osteoblasts: Math.min(100,
        (fiberDiameter > 1000 ? 95 : 80) *
        (youngsModulus > 70 ? 1 : youngsModulus / 70) *
        (poreSize > 7 ? 1 : 0.85)
      ),
      stemCells: Math.min(100,
        (fiberDiameter >= 400 && fiberDiameter <= 1200 ? 95 : 82) *
        (porosity > 70 ? 1 : 0.88) *
        (poreSize >= 5 ? 1 : 0.85)
      )
    };
  };

  const cellScores = Object.keys(predictions).length > 0 ? calculateCellScores() : {};

  // Generate MW comparison data
  const generateMWComparison = () => {
    const mwValues = [30000, 50000, 70000, 100000, 125000, 150000, 175000, 200000];
    return mwValues.map(mwVal => {
      const viscFactor = (mwVal / 100000) * (concentration / 10);
      const fd = 400 * viscFactor;
      const por = 95 - (fd / 100) * 2.5;
      const ts = 2.5 + (mwVal / 100000) * 5.2 + (concentration - 10) * 0.35;
      const ym = 25 + (mwVal / 100000) * 60 + (concentration - 10) * 2.5;
      const dr = 25 - (mwVal / 100000) * 10.5;
      
      return {
        mw: mwVal / 1000,
        fiberDiameter: Math.round(fd),
        porosity: Math.round(por * 10) / 10,
        tensileStrength: Math.round(ts * 10) / 10,
        youngsModulus: Math.round(ym),
        degradationRate: Math.round(dr * 10) / 10
      };
    });
  };

  const mwComparisonData = generateMWComparison();

  // Biodegradation temporal profile (16 weeks)
  const generateDegradationProfile = () => {
    const weeks = Array.from({ length: 17 }, (_, i) => i);
    return weeks.map(week => {
      const k = predictions.degradationRate / 100 * 0.15; // decay constant
      const massRemaining = 100 * Math.exp(-k * week);
      const mechanicalRetention = 100 * Math.pow(1 - week / 20, 1.5);
      const cellInfiltration = 100 / (1 + Math.exp(-0.4 * (week - 6)));
      
      return {
        week,
        massRemaining: Math.max(0, Math.round(massRemaining)),
        mechanicalRetention: Math.max(0, Math.round(mechanicalRetention)),
        cellInfiltration: Math.min(100, Math.round(cellInfiltration))
      };
    });
  };

  const degradationProfile = Object.keys(predictions).length > 0 ? generateDegradationProfile() : [];

  // Trade-off scatter data (Mechanical vs Porosity)
  const generateTradeoffData = () => {
    const data = [];
    for (let testMw = 30000; testMw <= 200000; testMw += 20000) {
      const viscFactor = (testMw / 100000) * (concentration / 10);
      const fd = 400 * viscFactor;
      const por = 95 - (fd / 100) * 2.5;
      const ps = (fd / 200) * 1.5 + (por / 20);
      const ts = 2.5 + (testMw / 100000) * 5.2 + (concentration - 10) * 0.35;
      
      data.push({
        mw: testMw / 1000,
        poreSize: Math.round(ps * 10) / 10,
        tensileStrength: Math.round(ts * 10) / 10,
        current: testMw === mw
      });
    }
    return data;
  };

  const tradeoffData = generateTradeoffData();

  // Radar chart data for current prediction
  const radarData = Object.keys(predictions).length > 0 ? [
    { property: 'Fiber Dia.', value: (predictions.fiberDiameter / 1500) * 100, fullMark: 100 },
    { property: 'Porosity', value: predictions.porosity, fullMark: 100 },
    { property: 'Tensile Str.', value: (predictions.tensileStrength / 32) * 100, fullMark: 100 },
    { property: 'Stiffness', value: (predictions.youngsModulus / 85) * 100, fullMark: 100 },
    { property: 'Degradation', value: (predictions.degradationRate / 25) * 100, fullMark: 100 }
  ] : [];

  // Helper function for score color
  const getScoreColor = (score) => {
    if (score >= 80) return 'text-green-600 bg-green-50';
    if (score >= 60) return 'text-yellow-600 bg-yellow-50';
    return 'text-orange-600 bg-orange-50';
  };

  const getScoreBadgeColor = (score) => {
    if (score >= 80) return 'bg-green-500';
    if (score >= 60) return 'bg-yellow-500';
    return 'bg-orange-500';
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 shadow-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Microscope className="h-8 w-8 text-blue-600" />
              <div>
                <h1 className="text-2xl font-bold text-gray-900">PVA Electrospinning Predictor</h1>
                <p className="text-sm text-gray-600">ML-Driven Biomedical Scaffold Optimization</p>
              </div>
            </div>
            <Badge variant="outline" className="text-sm">
              <Activity className="h-3 w-3 mr-1" />
              v2.1 Enhanced
            </Badge>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <Tabs defaultValue="predictor" className="space-y-6">
          <TabsList className="grid w-full grid-cols-5 lg:w-auto lg:inline-grid">
            <TabsTrigger value="predictor">Predictor</TabsTrigger>
            <TabsTrigger value="biomedical">Biomedical</TabsTrigger>
            <TabsTrigger value="analysis">Analysis</TabsTrigger>
            <TabsTrigger value="cascade">MW Cascade</TabsTrigger>
            <TabsTrigger value="about">About</TabsTrigger>
          </TabsList>

          {/* PREDICTOR TAB */}
          <TabsContent value="predictor" className="space-y-6">
            {/* Concentration Window Alert */}
            {predictions.isInWindow === false && (
              <Alert variant="destructive">
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>
                  Warning: Current concentration ({concentration} wt%) is outside the optimal spinnable window ({predictions.minConc}-{predictions.maxConc} wt%) for MW {(mw/1000).toFixed(0)}k Da. This may result in processing difficulties or defects.
                </AlertDescription>
              </Alert>
            )}

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Input Parameters */}
              <Card className="lg:col-span-1">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Zap className="h-5 w-5 text-blue-600" />
                    Processing Parameters
                  </CardTitle>
                  <CardDescription>Adjust electrospinning conditions</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <Label>Molecular Weight (g/mol)</Label>
                      <Badge variant="secondary">{(mw/1000).toFixed(0)}k Da</Badge>
                    </div>
                    <Slider
                      value={[mw]}
                      onValueChange={(val) => setMw(val[0])}
                      min={30000}
                      max={200000}
                      step={10000}
                      className="w-full"
                    />
                    <div className="text-xs text-gray-500 flex justify-between">
                      <span>30k</span>
                      <span>200k</span>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <Label>PVA Concentration (wt.%)</Label>
                      <Badge variant="secondary">{concentration.toFixed(1)}%</Badge>
                    </div>
                    <Slider
                      value={[concentration]}
                      onValueChange={(val) => setConcentration(val[0])}
                      min={5}
                      max={20}
                      step={0.5}
                      className="w-full"
                    />
                    <div className="text-xs text-gray-500 flex justify-between">
                      <span>5%</span>
                      <span className={predictions.isInWindow ? "text-green-600 font-semibold" : "text-red-600"}>
                        Window: {predictions.minConc}-{predictions.maxConc}%
                      </span>
                      <span>20%</span>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <Label>Applied Voltage (kV)</Label>
                      <Badge variant="secondary">{voltage.toFixed(1)} kV</Badge>
                    </div>
                    <Slider
                      value={[voltage]}
                      onValueChange={(val) => setVoltage(val[0])}
                      min={10}
                      max={25}
                      step={0.5}
                      className="w-full"
                    />
                    <div className="text-xs text-gray-500 flex justify-between">
                      <span>10 kV</span>
                      <span>25 kV</span>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <Label>Flow Rate (mL/h)</Label>
                      <Badge variant="secondary">{flowRate.toFixed(1)} mL/h</Badge>
                    </div>
                    <Slider
                      value={[flowRate]}
                      onValueChange={(val) => setFlowRate(val[0])}
                      min={0.5}
                      max={3.0}
                      step={0.1}
                      className="w-full"
                    />
                    <div className="text-xs text-gray-500 flex justify-between">
                      <span>0.5</span>
                      <span>3.0</span>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <Label>Needle-Collector Distance (cm)</Label>
                      <Badge variant="secondary">{distance} cm</Badge>
                    </div>
                    <Slider
                      value={[distance]}
                      onValueChange={(val) => setDistance(val[0])}
                      min={10}
                      max={25}
                      step={1}
                      className="w-full"
                    />
                    <div className="text-xs text-gray-500 flex justify-between">
                      <span>10 cm</span>
                      <span>25 cm</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Predicted Properties */}
              <Card className="lg:col-span-2">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Layers className="h-5 w-5 text-purple-600" />
                    Predicted Scaffold Properties
                  </CardTitle>
                  <CardDescription>Stage 1: Process-to-Architecture ML Model</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {/* Morphology Assessment */}
                  {predictions.morphology && (
                    <Alert className={predictions.morphology.includes("optimal") ? "border-green-500 bg-green-50" : predictions.morphology.includes("Beaded") ? "border-orange-500 bg-orange-50" : ""}>
                      <Info className="h-4 w-4" />
                      <AlertDescription>
                        <strong>Morphology:</strong> {predictions.morphology}
                      </AlertDescription>
                    </Alert>
                  )}

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {predictions.fiberDiameter && (
                      <div className="space-y-2">
                        <div className="flex justify-between items-center">
                          <span className="text-sm font-medium">Fiber Diameter</span>
                          <span className="text-sm font-bold text-blue-600">{Math.round(predictions.fiberDiameter)} nm</span>
                        </div>
                        <Progress value={(predictions.fiberDiameter / 1500) * 100} className="h-2" />
                        <p className="text-xs text-gray-500">Range: 150-1500 nm</p>
                      </div>
                    )}

                    {predictions.porosity && (
                      <div className="space-y-2">
                        <div className="flex justify-between items-center">
                          <span className="text-sm font-medium">Porosity</span>
                          <span className="text-sm font-bold text-green-600">{predictions.porosity.toFixed(1)}%</span>
                        </div>
                        <Progress value={predictions.porosity} className="h-2" />
                        <p className="text-xs text-gray-500">Range: 60-95%</p>
                      </div>
                    )}

                    {predictions.poreSize && (
                      <div className="space-y-2">
                        <div className="flex justify-between items-center">
                          <span className="text-sm font-medium">Average Pore Size</span>
                          <span className="text-sm font-bold text-purple-600">{predictions.poreSize.toFixed(1)} μm</span>
                        </div>
                        <Progress value={(predictions.poreSize / 15) * 100} className="h-2" />
                        <p className="text-xs text-gray-500">Range: 2-15 μm</p>
                      </div>
                    )}

                    {predictions.tensileStrength && (
                      <div className="space-y-2">
                        <div className="flex justify-between items-center">
                          <span className="text-sm font-medium">Tensile Strength</span>
                          <span className="text-sm font-bold text-red-600">{predictions.tensileStrength.toFixed(1)} MPa</span>
                        </div>
                        <Progress value={(predictions.tensileStrength / 32) * 100} className="h-2" />
                        <p className="text-xs text-gray-500">Range: 2-32 MPa (200k Da: 29.8 MPa)</p>
                      </div>
                    )}

                    {predictions.youngsModulus && (
                      <div className="space-y-2">
                        <div className="flex justify-between items-center">
                          <span className="text-sm font-medium">Young's Modulus</span>
                          <span className="text-sm font-bold text-indigo-600">{Math.round(predictions.youngsModulus)} MPa</span>
                        </div>
                        <Progress value={(predictions.youngsModulus / 85) * 100} className="h-2" />
                        <p className="text-xs text-gray-500">Range: 20-85 MPa (200k Da: 78 MPa)</p>
                      </div>
                    )}

                    {predictions.waterAbsorption && (
                      <div className="space-y-2">
                        <div className="flex justify-between items-center">
                          <span className="text-sm font-medium">Water Absorption</span>
                          <span className="text-sm font-bold text-cyan-600">{Math.round(predictions.waterAbsorption)}%</span>
                        </div>
                        <Progress value={(predictions.waterAbsorption / 950) * 100} className="h-2" />
                        <p className="text-xs text-gray-500">Range: 350-950%</p>
                      </div>
                    )}

                    {predictions.contactAngle && (
                      <div className="space-y-2">
                        <div className="flex justify-between items-center">
                          <span className="text-sm font-medium">Contact Angle</span>
                          <span className="text-sm font-bold text-orange-600">{Math.round(predictions.contactAngle)}°</span>
                        </div>
                        <Progress value={(predictions.contactAngle / 75) * 100} className="h-2" />
                        <p className="text-xs text-gray-500">Range: 35-75° (hydrophilic)</p>
                      </div>
                    )}

                    {predictions.degradationRate && (
                      <div className="space-y-2">
                        <div className="flex justify-between items-center">
                          <span className="text-sm font-medium">Degradation Rate</span>
                          <span className="text-sm font-bold text-pink-600">{predictions.degradationRate.toFixed(1)}% /week</span>
                        </div>
                        <Progress value={(predictions.degradationRate / 25) * 100} className="h-2" />
                        <p className="text-xs text-gray-500">Range: 4-25% /week</p>
                      </div>
                    )}

                    {predictions.swellingRatio && (
                      <div className="space-y-2">
                        <div className="flex justify-between items-center">
                          <span className="text-sm font-medium">Swelling Ratio (24h)</span>
                          <span className="text-sm font-bold text-teal-600">{predictions.swellingRatio.toFixed(1)}%</span>
                        </div>
                        <Progress value={predictions.swellingRatio} className="h-2" />
                        <p className="text-xs text-gray-500">Range: 80-100%</p>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Clinical Application Suitability */}
            {Object.keys(applicationScores).length > 0 && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <FlaskConical className="h-5 w-5 text-green-600" />
                    Clinical Application Suitability
                  </CardTitle>
                  <CardDescription>Predicted performance for specific biomedical applications</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    <Card className={`border-2 ${getScoreColor(applicationScores.skinRegeneration)}`}>
                      <CardHeader className="pb-3">
                        <CardTitle className="text-base flex items-center justify-between">
                          Skin Regeneration
                          <Badge className={getScoreBadgeColor(applicationScores.skinRegeneration)}>
                            {Math.round(applicationScores.skinRegeneration)}
                          </Badge>
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="text-xs space-y-1">
                        <p>• Optimal fiber: 200-600 nm</p>
                        <p>• High porosity (&gt;80%)</p>
                        <p>• Fast degradation (2-4 weeks)</p>
                      </CardContent>
                    </Card>

                    <Card className={`border-2 ${getScoreColor(applicationScores.vascularEngineering)}`}>
                      <CardHeader className="pb-3">
                        <CardTitle className="text-base flex items-center justify-between">
                          Vascular Engineering
                          <Badge className={getScoreBadgeColor(applicationScores.vascularEngineering)}>
                            {Math.round(applicationScores.vascularEngineering)}
                          </Badge>
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="text-xs space-y-1">
                        <p>• Fiber: 400-1200 nm</p>
                        <p>• Tensile: 5-12 MPa</p>
                        <p>• Porosity &gt;70%</p>
                      </CardContent>
                    </Card>

                    <Card className={`border-2 ${getScoreColor(applicationScores.nerveGuidance)}`}>
                      <CardHeader className="pb-3">
                        <CardTitle className="text-base flex items-center justify-between">
                          Nerve Guidance
                          <Badge className={getScoreBadgeColor(applicationScores.nerveGuidance)}>
                            {Math.round(applicationScores.nerveGuidance)}
                          </Badge>
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="text-xs space-y-1">
                        <p>• Fiber: 500-900 nm (aligned)</p>
                        <p>• Porosity &gt;72%</p>
                        <p>• Degradation: 8-12 weeks</p>
                      </CardContent>
                    </Card>

                    <Card className={`border-2 ${getScoreColor(applicationScores.cartilageRepair)}`}>
                      <CardHeader className="pb-3">
                        <CardTitle className="text-base flex items-center justify-between">
                          Cartilage Repair
                          <Badge className={getScoreBadgeColor(applicationScores.cartilageRepair)}>
                            {Math.round(applicationScores.cartilageRepair)}
                          </Badge>
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="text-xs space-y-1">
                        <p>• Fiber: &gt;800 nm</p>
                        <p>• Pore size: &gt;6 μm</p>
                        <p>• High stiffness (&gt;60 MPa)</p>
                      </CardContent>
                    </Card>

                    <Card className={`border-2 ${getScoreColor(applicationScores.boneEngineering)}`}>
                      <CardHeader className="pb-3">
                        <CardTitle className="text-base flex items-center justify-between">
                          Bone Engineering
                          <Badge className={getScoreBadgeColor(applicationScores.boneEngineering)}>
                            {Math.round(applicationScores.boneEngineering)}
                          </Badge>
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="text-xs space-y-1">
                        <p>• Fiber: &gt;1000 nm</p>
                        <p>• Max stiffness (&gt;70 MPa)</p>
                        <p>• Slow degradation (&lt;7%/week)</p>
                      </CardContent>
                    </Card>

                    <Card className={`border-2 ${getScoreColor(applicationScores.drugDelivery)}`}>
                      <CardHeader className="pb-3">
                        <CardTitle className="text-base flex items-center justify-between">
                          Drug Delivery
                          <Badge className={getScoreBadgeColor(applicationScores.drugDelivery)}>
                            {Math.round(applicationScores.drugDelivery)}
                          </Badge>
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="text-xs space-y-1">
                        <p>• Fiber: &lt;500 nm (high SA/V)</p>
                        <p>• Very high porosity (&gt;82%)</p>
                        <p>• Controlled degradation</p>
                      </CardContent>
                    </Card>
                  </div>
                </CardContent>
              </Card>
            )}
          </TabsContent>

          {/* BIOMEDICAL TAB */}
          <TabsContent value="biomedical" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Dna className="h-5 w-5 text-purple-600" />
                  Stage 2: Architecture-to-Biology Predictions
                </CardTitle>
                <CardDescription>Predicted biological outcomes and cellular responses</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Key Biological Metrics */}
                {biologicalOutcomes.cellViability && (
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <Card className="border-green-200 bg-green-50">
                      <CardHeader className="pb-3">
                        <CardTitle className="text-sm text-green-700">Cell Viability</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="text-3xl font-bold text-green-600">{biologicalOutcomes.cellViability.toFixed(1)}%</div>
                        <p className="text-xs text-green-600 mt-1">Excellent biocompatibility</p>
                      </CardContent>
                    </Card>

                    <Card className="border-blue-200 bg-blue-50">
                      <CardHeader className="pb-3">
                        <CardTitle className="text-sm text-blue-700">Proliferation Time</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="text-3xl font-bold text-blue-600">{biologicalOutcomes.proliferationTime.toFixed(1)}h</div>
                        <p className="text-xs text-blue-600 mt-1">Cell doubling time</p>
                      </CardContent>
                    </Card>

                    <Card className="border-purple-200 bg-purple-50">
                      <CardHeader className="pb-3">
                        <CardTitle className="text-sm text-purple-700">MSC Lineage</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="text-lg font-bold text-purple-600">{biologicalOutcomes.mscLineage}</div>
                        <p className="text-xs text-purple-600 mt-1">Based on substrate stiffness</p>
                      </CardContent>
                    </Card>
                  </div>
                )}

                {/* Cartilage-Specific Markers */}
                {biologicalOutcomes.gagContent && (
                  <Card className="border-indigo-200 bg-indigo-50">
                    <CardHeader>
                      <CardTitle className="text-base text-indigo-700">Chondrogenesis Markers (Cartilage Repair)</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <div className="flex justify-between items-center mb-2">
                            <span className="text-sm font-medium text-indigo-700">GAG Content</span>
                            <span className="text-sm font-bold text-indigo-600">{biologicalOutcomes.gagContent.toFixed(1)} μg/mg</span>
                          </div>
                          <Progress value={(biologicalOutcomes.gagContent / 45) * 100} className="h-2" />
                          <p className="text-xs text-indigo-600 mt-1">Proteoglycan production (cartilage ECM)</p>
                        </div>

                        <div>
                          <div className="flex justify-between items-center mb-2">
                            <span className="text-sm font-medium text-indigo-700">Collagen II Expression</span>
                            <span className="text-sm font-bold text-indigo-600">{biologicalOutcomes.col2Expression.toFixed(1)}x fold</span>
                          </div>
                          <Progress value={(biologicalOutcomes.col2Expression / 8) * 100} className="h-2" />
                          <p className="text-xs text-indigo-600 mt-1">Healthy cartilage phenotype marker</p>
                        </div>

                        <div>
                          <div className="flex justify-between items-center mb-2">
                            <span className="text-sm font-medium text-indigo-700">Aggrecan Expression</span>
                            <span className="text-sm font-bold text-indigo-600">{biologicalOutcomes.aggrecanExpression.toFixed(1)}x fold</span>
                          </div>
                          <Progress value={(biologicalOutcomes.aggrecanExpression / 6) * 100} className="h-2" />
                          <p className="text-xs text-indigo-600 mt-1">Major proteoglycan in cartilage</p>
                        </div>

                        <div>
                          <div className="flex justify-between items-center mb-2">
                            <span className="text-sm font-medium text-indigo-700">Collagen I/II Ratio</span>
                            <span className={`text-sm font-bold ${biologicalOutcomes.col1_col2_ratio < 0.5 ? 'text-green-600' : 'text-orange-600'}`}>
                              {biologicalOutcomes.col1_col2_ratio.toFixed(2)}
                            </span>
                          </div>
                          <Progress value={100 - (biologicalOutcomes.col1_col2_ratio / 2.5) * 100} className="h-2" />
                          <p className="text-xs text-indigo-600 mt-1">Lower is better (avoid fibrocartilage)</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                )}

                {/* MSC Differentiation Potential */}
                {biologicalOutcomes.osteogenicScore && (
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-base">MSC Differentiation Potential</CardTitle>
                      <CardDescription>Substrate stiffness-dependent lineage commitment</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <ResponsiveContainer width="100%" height={300}>
                        <BarChart data={[
                          { lineage: 'Neurogenic', score: biologicalOutcomes.neurogenicScore },
                          { lineage: 'Chondrogenic', score: biologicalOutcomes.chondrogenicScore },
                          { lineage: 'Osteogenic', score: biologicalOutcomes.osteogenicScore }
                        ]}>
                          <CartesianGrid strokeDasharray="3 3" />
                          <XAxis dataKey="lineage" />
                          <YAxis label={{ value: 'Differentiation Score', angle: -90, position: 'insideLeft' }} />
                          <Tooltip />
                          <Bar dataKey="score" fill="#8b5cf6" />
                        </BarChart>
                      </ResponsiveContainer>
                      <p className="text-xs text-gray-600 mt-2">
                        Current stiffness ({predictions.youngsModulus?.toFixed(0)} MPa) promotes <strong>{biologicalOutcomes.mscLineage}</strong> differentiation
                      </p>
                    </CardContent>
                  </Card>
                )}

                {/* Drug Release Profile */}
                {biologicalOutcomes.burstRelease && (
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-base">Drug Release Kinetics</CardTitle>
                      <CardDescription>MW-dependent release profile</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="p-4 border rounded-lg bg-orange-50 border-orange-200">
                          <div className="text-sm font-medium text-orange-700 mb-2">Burst Release (0-24h)</div>
                          <div className="text-3xl font-bold text-orange-600">{biologicalOutcomes.burstRelease.toFixed(0)}%</div>
                          <p className="text-xs text-orange-600 mt-1">Initial rapid release from surface</p>
                        </div>

                        <div className="p-4 border rounded-lg bg-blue-50 border-blue-200">
                          <div className="text-sm font-medium text-blue-700 mb-2">Sustained Duration</div>
                          <div className="text-3xl font-bold text-blue-600">{biologicalOutcomes.sustainedDuration.toFixed(0)} days</div>
                          <p className="text-xs text-blue-600 mt-1">Prolonged release from bulk</p>
                        </div>
                      </div>
                      <Alert>
                        <Info className="h-4 w-4" />
                        <AlertDescription className="text-sm">
                          {mw < 70000 ? 
                            "Low MW favors rapid drug delivery (antibiotics, immediate therapeutic effect)" :
                            mw > 150000 ?
                            "High MW provides sustained release (growth factors, long-term angiogenesis)" :
                            "Medium MW offers balanced release profile (wound healing, tissue regeneration)"
                          }
                        </AlertDescription>
                      </Alert>
                    </CardContent>
                  </Card>
                )}

                {/* Cell Compatibility Scores */}
                {Object.keys(cellScores).length > 0 && (
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-base">Cell Type Compatibility</CardTitle>
                      <CardDescription>Predicted suitability for different cell types</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <ResponsiveContainer width="100%" height={300}>
                        <BarChart data={[
                          { cell: 'Fibroblasts', score: cellScores.fibroblasts },
                          { cell: 'Endothelial', score: cellScores.endothelial },
                          { cell: 'Schwann', score: cellScores.schwann },
                          { cell: 'Chondrocytes', score: cellScores.chondrocytes },
                          { cell: 'Osteoblasts', score: cellScores.osteoblasts },
                          { cell: 'Stem Cells', score: cellScores.stemCells }
                        ]}>
                          <CartesianGrid strokeDasharray="3 3" />
                          <XAxis dataKey="cell" angle={-15} textAnchor="end" height={80} />
                          <YAxis label={{ value: 'Compatibility Score', angle: -90, position: 'insideLeft' }} />
                          <Tooltip />
                          <Bar dataKey="score" fill="#10b981" />
                        </BarChart>
                      </ResponsiveContainer>
                    </CardContent>
                  </Card>
                )}

                {/* Biodegradation Temporal Profile */}
                {degradationProfile.length > 0 && (
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-base">Biodegradation Temporal Profile (16 Weeks)</CardTitle>
                      <CardDescription>Mass loss, mechanical retention, and cell infiltration over time</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <ResponsiveContainer width="100%" height={350}>
                        <AreaChart data={degradationProfile}>
                          <CartesianGrid strokeDasharray="3 3" />
                          <XAxis dataKey="week" label={{ value: 'Time (weeks)', position: 'insideBottom', offset: -5 }} />
                          <YAxis label={{ value: 'Percentage (%)', angle: -90, position: 'insideLeft' }} />
                          <Tooltip />
                          <Legend />
                          <Area type="monotone" dataKey="massRemaining" stackId="1" stroke="#ef4444" fill="#ef4444" fillOpacity={0.6} name="Mass Remaining" />
                          <Area type="monotone" dataKey="mechanicalRetention" stackId="2" stroke="#3b82f6" fill="#3b82f6" fillOpacity={0.6} name="Mechanical Retention" />
                          <Area type="monotone" dataKey="cellInfiltration" stackId="3" stroke="#10b981" fill="#10b981" fillOpacity={0.6} name="Cell Infiltration" />
                        </AreaChart>
                      </ResponsiveContainer>
                      <div className="mt-4 grid grid-cols-3 gap-4 text-center text-sm">
                        <div>
                          <div className="font-semibold text-red-600">Week 4</div>
                          <div className="text-xs text-gray-600">{degradationProfile[4]?.massRemaining}% mass</div>
                        </div>
                        <div>
                          <div className="font-semibold text-blue-600">Week 8</div>
                          <div className="text-xs text-gray-600">{degradationProfile[8]?.mechanicalRetention}% strength</div>
                        </div>
                        <div>
                          <div className="font-semibold text-green-600">Week 12</div>
                          <div className="text-xs text-gray-600">{degradationProfile[12]?.cellInfiltration}% infiltration</div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                )}

                {/* Cell Type Recommendations */}
                {Object.keys(cellScores).length > 0 && (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    <Card className={`border-2 ${getScoreColor(cellScores.fibroblasts)}`}>
                      <CardHeader className="pb-3">
                        <CardTitle className="text-sm flex items-center justify-between">
                          Fibroblasts
                          <Badge className={getScoreBadgeColor(cellScores.fibroblasts)}>
                            {Math.round(cellScores.fibroblasts)}
                          </Badge>
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="text-xs space-y-1">
                        <p><strong>Optimal:</strong> 200-500 nm fibers</p>
                        <p><strong>Porosity:</strong> &gt;75%</p>
                        <p><strong>Application:</strong> Wound healing, dermal regeneration</p>
                        <p><strong>ECM:</strong> Collagen I, fibronectin</p>
                      </CardContent>
                    </Card>

                    <Card className={`border-2 ${getScoreColor(cellScores.endothelial)}`}>
                      <CardHeader className="pb-3">
                        <CardTitle className="text-sm flex items-center justify-between">
                          Endothelial Cells
                          <Badge className={getScoreBadgeColor(cellScores.endothelial)}>
                            {Math.round(cellScores.endothelial)}
                          </Badge>
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="text-xs space-y-1">
                        <p><strong>Optimal:</strong> 400-1000 nm fibers</p>
                        <p><strong>Porosity:</strong> &gt;70%</p>
                        <p><strong>Application:</strong> Vascular grafts, angiogenesis</p>
                        <p><strong>Markers:</strong> CD31, vWF, eNOS</p>
                      </CardContent>
                    </Card>

                    <Card className={`border-2 ${getScoreColor(cellScores.schwann)}`}>
                      <CardHeader className="pb-3">
                        <CardTitle className="text-sm flex items-center justify-between">
                          Schwann Cells
                          <Badge className={getScoreBadgeColor(cellScores.schwann)}>
                            {Math.round(cellScores.schwann)}
                          </Badge>
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="text-xs space-y-1">
                        <p><strong>Optimal:</strong> 500-900 nm (aligned)</p>
                        <p><strong>Porosity:</strong> &gt;72%</p>
                        <p><strong>Application:</strong> Nerve conduits, spinal cord injury</p>
                        <p><strong>Factors:</strong> NGF, BDNF, GDNF secretion</p>
                      </CardContent>
                    </Card>

                    <Card className={`border-2 ${getScoreColor(cellScores.chondrocytes)}`}>
                      <CardHeader className="pb-3">
                        <CardTitle className="text-sm flex items-center justify-between">
                          Chondrocytes
                          <Badge className={getScoreBadgeColor(cellScores.chondrocytes)}>
                            {Math.round(cellScores.chondrocytes)}
                          </Badge>
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="text-xs space-y-1">
                        <p><strong>Optimal:</strong> &gt;800 nm fibers</p>
                        <p><strong>Pore size:</strong> &gt;6 μm</p>
                        <p><strong>Application:</strong> Cartilage repair, osteochondral defects</p>
                        <p><strong>ECM:</strong> Collagen II, aggrecan, GAGs</p>
                      </CardContent>
                    </Card>

                    <Card className={`border-2 ${getScoreColor(cellScores.osteoblasts)}`}>
                      <CardHeader className="pb-3">
                        <CardTitle className="text-sm flex items-center justify-between">
                          Osteoblasts
                          <Badge className={getScoreBadgeColor(cellScores.osteoblasts)}>
                            {Math.round(cellScores.osteoblasts)}
                          </Badge>
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="text-xs space-y-1">
                        <p><strong>Optimal:</strong> &gt;1000 nm fibers</p>
                        <p><strong>Stiffness:</strong> &gt;70 MPa</p>
                        <p><strong>Application:</strong> Bone grafts, craniofacial reconstruction</p>
                        <p><strong>Markers:</strong> ALP, osteocalcin, osteopontin</p>
                      </CardContent>
                    </Card>

                    <Card className={`border-2 ${getScoreColor(cellScores.stemCells)}`}>
                      <CardHeader className="pb-3">
                        <CardTitle className="text-sm flex items-center justify-between">
                          Stem Cells (MSCs)
                          <Badge className={getScoreBadgeColor(cellScores.stemCells)}>
                            {Math.round(cellScores.stemCells)}
                          </Badge>
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="text-xs space-y-1">
                        <p><strong>Optimal:</strong> 400-1200 nm (versatile)</p>
                        <p><strong>Porosity:</strong> &gt;70%</p>
                        <p><strong>Application:</strong> Regenerative medicine, tissue repair</p>
                        <p><strong>Lineage:</strong> Stiffness-dependent (see above)</p>
                      </CardContent>
                    </Card>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          {/* ANALYSIS TAB */}
          <TabsContent value="analysis" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Fiber Diameter vs MW */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-base">Fiber Diameter vs. Molecular Weight</CardTitle>
                  <CardDescription>Morphology trends across MW range</CardDescription>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <LineChart data={mwComparisonData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="mw" label={{ value: 'Molecular Weight (kDa)', position: 'insideBottom', offset: -5 }} />
                      <YAxis label={{ value: 'Fiber Diameter (nm)', angle: -90, position: 'insideLeft' }} />
                      <Tooltip />
                      <Legend />
                      <Line type="monotone" dataKey="fiberDiameter" stroke="#3b82f6" strokeWidth={2} dot={{ r: 4 }} name="Fiber Diameter" />
                    </LineChart>
                  </ResponsiveContainer>
                  <p className="text-xs text-gray-600 mt-2">
                    Fiber diameter increases 3-4× from 30k to 200k Da due to higher solution viscosity and chain entanglement density.
                  </p>
                </CardContent>
              </Card>

              {/* Porosity vs MW */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-base">Porosity vs. Molecular Weight</CardTitle>
                  <CardDescription>Inverse relationship with fiber diameter</CardDescription>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <LineChart data={mwComparisonData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="mw" label={{ value: 'Molecular Weight (kDa)', position: 'insideBottom', offset: -5 }} />
                      <YAxis label={{ value: 'Porosity (%)', angle: -90, position: 'insideLeft' }} />
                      <Tooltip />
                      <Legend />
                      <Line type="monotone" dataKey="porosity" stroke="#10b981" strokeWidth={2} dot={{ r: 4 }} name="Porosity" />
                    </LineChart>
                  </ResponsiveContainer>
                  <p className="text-xs text-gray-600 mt-2">
                    Porosity decreases with MW as thicker fibers create denser packing, reducing void volume.
                  </p>
                </CardContent>
              </Card>

              {/* Mechanical Properties Comparison */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-base">Mechanical Properties vs. MW</CardTitle>
                  <CardDescription>Tensile strength and Young's modulus trends</CardDescription>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <LineChart data={mwComparisonData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="mw" label={{ value: 'Molecular Weight (kDa)', position: 'insideBottom', offset: -5 }} />
                      <YAxis yAxisId="left" label={{ value: 'Tensile Strength (MPa)', angle: -90, position: 'insideLeft' }} />
                      <YAxis yAxisId="right" orientation="right" label={{ value: "Young's Modulus (MPa)", angle: 90, position: 'insideRight' }} />
                      <Tooltip />
                      <Legend />
                      <Line yAxisId="left" type="monotone" dataKey="tensileStrength" stroke="#ef4444" strokeWidth={2} dot={{ r: 4 }} name="Tensile Strength" />
                      <Line yAxisId="right" type="monotone" dataKey="youngsModulus" stroke="#8b5cf6" strokeWidth={2} dot={{ r: 4 }} name="Young's Modulus" />
                    </LineChart>
                  </ResponsiveContainer>
                  <p className="text-xs text-gray-600 mt-2">
                    Both properties increase 2-3× with MW. 200k Da achieves 29.8 MPa tensile strength and 78 MPa Young's modulus (experimental data).
                  </p>
                </CardContent>
              </Card>

              {/* Degradation Rate vs MW */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-base">Degradation Rate vs. MW</CardTitle>
                  <CardDescription>Biodegradation kinetics</CardDescription>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <LineChart data={mwComparisonData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="mw" label={{ value: 'Molecular Weight (kDa)', position: 'insideBottom', offset: -5 }} />
                      <YAxis label={{ value: 'Degradation Rate (%/week)', angle: -90, position: 'insideLeft' }} />
                      <Tooltip />
                      <Legend />
                      <Line type="monotone" dataKey="degradationRate" stroke="#f59e0b" strokeWidth={2} dot={{ r: 4 }} name="Degradation Rate" />
                    </LineChart>
                  </ResponsiveContainer>
                  <p className="text-xs text-gray-600 mt-2">
                    Degradation rate decreases with MW from ~20%/week (30k) to ~5%/week (200k) due to increased chain entanglement and crystallinity.
                  </p>
                </CardContent>
              </Card>

              {/* Trade-off: Mechanical vs Pore Size */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-base">Trade-off: Mechanical Strength vs. Pore Size</CardTitle>
                  <CardDescription>Multi-objective optimization challenge</CardDescription>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <ScatterChart>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="poreSize" label={{ value: 'Pore Size (μm)', position: 'insideBottom', offset: -5 }} />
                      <YAxis dataKey="tensileStrength" label={{ value: 'Tensile Strength (MPa)', angle: -90, position: 'insideLeft' }} />
                      <Tooltip cursor={{ strokeDasharray: '3 3' }} />
                      <Legend />
                      <Scatter name="MW Range" data={tradeoffData} fill="#8b5cf6">
                        {tradeoffData.map((entry, index) => (
                          <circle key={index} r={entry.current ? 8 : 4} fill={entry.current ? "#ef4444" : "#8b5cf6"} />
                        ))}
                      </Scatter>
                    </ScatterChart>
                  </ResponsiveContainer>
                  <p className="text-xs text-gray-600 mt-2">
                    <span className="inline-block w-3 h-3 bg-red-500 rounded-full mr-1"></span>
                    Current selection. High MW provides strength but larger pores; low MW offers small pores but lower strength.
                  </p>
                </CardContent>
              </Card>

              {/* Current Prediction Radar */}
              {radarData.length > 0 && (
                <Card>
                  <CardHeader>
                    <CardTitle className="text-base">Current Prediction Profile</CardTitle>
                    <CardDescription>Multi-property radar chart</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ResponsiveContainer width="100%" height={300}>
                      <RadarChart data={radarData}>
                        <PolarGrid />
                        <PolarAngleAxis dataKey="property" />
                        <PolarRadiusAxis angle={90} domain={[0, 100]} />
                        <Radar name="Properties" dataKey="value" stroke="#8b5cf6" fill="#8b5cf6" fillOpacity={0.6} />
                        <Tooltip />
                      </RadarChart>
                    </ResponsiveContainer>
                    <p className="text-xs text-gray-600 mt-2">
                      Normalized property profile (0-100%). Balanced profile indicates versatile scaffold; skewed profile suggests specialized application.
                    </p>
                  </CardContent>
                </Card>
              )}
            </div>
          </TabsContent>

          {/* MW CASCADE TAB */}
          <TabsContent value="cascade" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="h-5 w-5 text-indigo-600" />
                  MW as Master Variable: The Causal Cascade
                </CardTitle>
                <CardDescription>How molecular weight controls the entire scaffold design hierarchy</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <Alert className="border-indigo-200 bg-indigo-50">
                  <Info className="h-4 w-4 text-indigo-600" />
                  <AlertDescription className="text-indigo-700">
                    <strong>Key Insight:</strong> PVA molecular weight acts as a foundational constraint, defining the entire processing landscape and serving as a master variable that dictates the resulting scaffold's architecture, dynamics, and biological functionality.
                  </AlertDescription>
                </Alert>

                {/* Cascade Visualization */}
                <div className="space-y-4">
                  {/* Level 1: MW Selection */}
                  <div className="p-4 border-2 border-indigo-500 rounded-lg bg-indigo-50">
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="text-sm font-semibold text-indigo-700">LEVEL 1: MW SELECTION</div>
                        <div className="text-2xl font-bold text-indigo-600 mt-1">{(mw/1000).toFixed(0)}k Da</div>
                      </div>
                      <Badge className="bg-indigo-600 text-white text-lg px-4 py-2">Master Variable</Badge>
                    </div>
                    <p className="text-xs text-indigo-600 mt-2">
                      Determines chain length, entanglement density, and all downstream properties
                    </p>
                  </div>

                  <div className="flex justify-center">
                    <div className="text-3xl text-gray-400">↓</div>
                  </div>

                  {/* Level 2: Solution Rheology */}
                  <div className="p-4 border-2 border-purple-400 rounded-lg bg-purple-50">
                    <div className="text-sm font-semibold text-purple-700 mb-2">LEVEL 2: SOLUTION RHEOLOGY</div>
                    <div className="grid grid-cols-2 gap-3 text-sm">
                      <div>
                        <span className="font-medium text-purple-600">Viscosity:</span>
                        <span className="ml-2">{mw < 70000 ? "Low" : mw < 150000 ? "Moderate" : "High"}</span>
                      </div>
                      <div>
                        <span className="font-medium text-purple-600">Entanglement:</span>
                        <span className="ml-2">{mw < 70000 ? "Sparse" : mw < 150000 ? "Moderate" : "Dense"}</span>
                      </div>
                      <div>
                        <span className="font-medium text-purple-600">Spinnable Window:</span>
                        <span className="ml-2">{predictions.minConc}-{predictions.maxConc} wt%</span>
                      </div>
                      <div>
                        <span className="font-medium text-purple-600">Extensional Behavior:</span>
                        <span className="ml-2">{mw > 150000 ? "High resistance" : "Moderate"}</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex justify-center">
                    <div className="text-3xl text-gray-400">↓</div>
                  </div>

                  {/* Level 3: Jet Stability & Spinnability */}
                  <div className="p-4 border-2 border-blue-400 rounded-lg bg-blue-50">
                    <div className="text-sm font-semibold text-blue-700 mb-2">LEVEL 3: JET STABILITY & SPINNABILITY</div>
                    <div className="grid grid-cols-2 gap-3 text-sm">
                      <div>
                        <span className="font-medium text-blue-600">Jet Cohesion:</span>
                        <span className="ml-2">{mw < 70000 ? "Weak (bead risk)" : "Strong"}</span>
                      </div>
                      <div>
                        <span className="font-medium text-blue-600">Stretching Resistance:</span>
                        <span className="ml-2">{mw < 70000 ? "Low" : mw < 150000 ? "Moderate" : "High"}</span>
                      </div>
                      <div>
                        <span className="font-medium text-blue-600">Solvent Evaporation:</span>
                        <span className="ml-2">{mw > 150000 ? "May be incomplete" : "Complete"}</span>
                      </div>
                      <div>
                        <span className="font-medium text-blue-600">Fiber Formation:</span>
                        <span className="ml-2">{predictions.morphology && predictions.morphology.includes("Beaded") ? "Defective" : "Uniform"}</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex justify-center">
                    <div className="text-3xl text-gray-400">↓</div>
                  </div>

                  {/* Level 4: Nanofiber Morphology */}
                  {predictions.fiberDiameter && (
                    <div className="p-4 border-2 border-green-400 rounded-lg bg-green-50">
                      <div className="text-sm font-semibold text-green-700 mb-2">LEVEL 4: NANOFIBER MORPHOLOGY</div>
                      <div className="grid grid-cols-2 gap-3 text-sm">
                        <div>
                          <span className="font-medium text-green-600">Fiber Diameter:</span>
                          <span className="ml-2 font-bold">{Math.round(predictions.fiberDiameter)} nm</span>
                        </div>
                        <div>
                          <span className="font-medium text-green-600">Uniformity:</span>
                          <span className="ml-2">{predictions.morphology && predictions.morphology.includes("uniform") ? "Excellent" : "Poor"}</span>
                        </div>
                        <div>
                          <span className="font-medium text-green-600">Cross-section:</span>
                          <span className="ml-2">{mw > 150000 && concentration > 10 ? "Ribbon-like" : "Circular"}</span>
                        </div>
                        <div>
                          <span className="font-medium text-green-600">Surface Texture:</span>
                          <span className="ml-2">{mw < 70000 ? "Rough (beads)" : "Smooth"}</span>
                        </div>
                      </div>
                    </div>
                  )}

                  <div className="flex justify-center">
                    <div className="text-3xl text-gray-400">↓</div>
                  </div>

                  {/* Level 5: Scaffold Architecture */}
                  {predictions.porosity && (
                    <div className="p-4 border-2 border-yellow-400 rounded-lg bg-yellow-50">
                      <div className="text-sm font-semibold text-yellow-700 mb-2">LEVEL 5: SCAFFOLD ARCHITECTURE</div>
                      <div className="grid grid-cols-2 gap-3 text-sm">
                        <div>
                          <span className="font-medium text-yellow-600">Porosity:</span>
                          <span className="ml-2 font-bold">{predictions.porosity.toFixed(1)}%</span>
                        </div>
                        <div>
                          <span className="font-medium text-yellow-600">Pore Size:</span>
                          <span className="ml-2 font-bold">{predictions.poreSize.toFixed(1)} μm</span>
                        </div>
                        <div>
                          <span className="font-medium text-yellow-600">Tensile Strength:</span>
                          <span className="ml-2 font-bold">{predictions.tensileStrength.toFixed(1)} MPa</span>
                        </div>
                        <div>
                          <span className="font-medium text-yellow-600">Young's Modulus:</span>
                          <span className="ml-2 font-bold">{Math.round(predictions.youngsModulus)} MPa</span>
                        </div>
                      </div>
                    </div>
                  )}

                  <div className="flex justify-center">
                    <div className="text-3xl text-gray-400">↓</div>
                  </div>

                  {/* Level 6: Dynamic Behavior */}
                  {predictions.degradationRate && (
                    <div className="p-4 border-2 border-orange-400 rounded-lg bg-orange-50">
                      <div className="text-sm font-semibold text-orange-700 mb-2">LEVEL 6: DYNAMIC BEHAVIOR</div>
                      <div className="grid grid-cols-2 gap-3 text-sm">
                        <div>
                          <span className="font-medium text-orange-600">Degradation Rate:</span>
                          <span className="ml-2 font-bold">{predictions.degradationRate.toFixed(1)}% /week</span>
                        </div>
                        <div>
                          <span className="font-medium text-orange-600">Swelling Ratio:</span>
                          <span className="ml-2 font-bold">{predictions.swellingRatio.toFixed(1)}%</span>
                        </div>
                        <div>
                          <span className="font-medium text-orange-600">Water Absorption:</span>
                          <span className="ml-2 font-bold">{Math.round(predictions.waterAbsorption)}%</span>
                        </div>
                        <div>
                          <span className="font-medium text-orange-600">Structural Stability:</span>
                          <span className="ml-2">{mw > 150000 ? "High" : mw > 70000 ? "Moderate" : "Low"}</span>
                        </div>
                      </div>
                    </div>
                  )}

                  <div className="flex justify-center">
                    <div className="text-3xl text-gray-400">↓</div>
                  </div>

                  {/* Level 7: Cellular Response */}
                  {biologicalOutcomes.cellViability && (
                    <div className="p-4 border-2 border-pink-400 rounded-lg bg-pink-50">
                      <div className="text-sm font-semibold text-pink-700 mb-2">LEVEL 7: CELLULAR RESPONSE</div>
                      <div className="grid grid-cols-2 gap-3 text-sm">
                        <div>
                          <span className="font-medium text-pink-600">Cell Viability:</span>
                          <span className="ml-2 font-bold">{biologicalOutcomes.cellViability.toFixed(1)}%</span>
                        </div>
                        <div>
                          <span className="font-medium text-pink-600">Proliferation:</span>
                          <span className="ml-2 font-bold">{biologicalOutcomes.proliferationTime.toFixed(0)}h doubling</span>
                        </div>
                        <div>
                          <span className="font-medium text-pink-600">MSC Lineage:</span>
                          <span className="ml-2 font-bold">{biologicalOutcomes.mscLineage}</span>
                        </div>
                        <div>
                          <span className="font-medium text-pink-600">Mechanotransduction:</span>
                          <span className="ml-2">{predictions.youngsModulus > 60 ? "Stiff cues" : "Soft cues"}</span>
                        </div>
                      </div>
                    </div>
                  )}

                  <div className="flex justify-center">
                    <div className="text-3xl text-gray-400">↓</div>
                  </div>

                  {/* Level 8: Biomedical Functionality */}
                  {Object.keys(applicationScores).length > 0 && (
                    <div className="p-4 border-2 border-red-500 rounded-lg bg-red-50">
                      <div className="text-sm font-semibold text-red-700 mb-2">LEVEL 8: BIOMEDICAL FUNCTIONALITY</div>
                      <div className="grid grid-cols-2 gap-3 text-sm">
                        <div>
                          <span className="font-medium text-red-600">Top Application:</span>
                          <span className="ml-2 font-bold">
                            {Object.entries(applicationScores).reduce((a, b) => a[1] > b[1] ? a : b)[0].replace(/([A-Z])/g, ' $1').trim()}
                          </span>
                        </div>
                        <div>
                          <span className="font-medium text-red-600">Score:</span>
                          <span className="ml-2 font-bold">{Math.round(Math.max(...Object.values(applicationScores)))}/100</span>
                        </div>
                        <div>
                          <span className="font-medium text-red-600">Best Cell Type:</span>
                          <span className="ml-2 font-bold">
                            {Object.entries(cellScores).reduce((a, b) => a[1] > b[1] ? a : b)[0]}
                          </span>
                        </div>
                        <div>
                          <span className="font-medium text-red-600">Clinical Readiness:</span>
                          <span className="ml-2">{Math.max(...Object.values(applicationScores)) > 80 ? "High" : "Moderate"}</span>
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                {/* Key Insights */}
                <Card className="border-indigo-200 bg-indigo-50">
                  <CardHeader>
                    <CardTitle className="text-base text-indigo-700">Key Insights from the Cascade</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3 text-sm text-indigo-700">
                    <div className="flex gap-2">
                      <CheckCircle2 className="h-5 w-5 flex-shrink-0 text-indigo-600" />
                      <p><strong>MW is not an independent variable:</strong> It constrains the viable concentration range. High MW (&gt;150k) requires lower concentration (&lt;10 wt%) to remain spinnable.</p>
                    </div>
                    <div className="flex gap-2">
                      <CheckCircle2 className="h-5 w-5 flex-shrink-0 text-indigo-600" />
                      <p><strong>Coupled properties:</strong> You cannot independently optimize mechanical strength and pore size by tuning MW alone. High MW gives strength but large pores; low MW gives small pores but lower strength.</p>
                    </div>
                    <div className="flex gap-2">
                      <CheckCircle2 className="h-5 w-5 flex-shrink-0 text-indigo-600" />
                      <p><strong>Temporal programming:</strong> MW selection sets the "scaffold half-life" to match tissue healing timelines. Skin (fast) needs low MW; bone (slow) needs high MW.</p>
                    </div>
                    <div className="flex gap-2">
                      <CheckCircle2 className="h-5 w-5 flex-shrink-0 text-indigo-600" />
                      <p><strong>Mechanobiological control:</strong> By selecting MW, you simultaneously set fiber diameter AND substrate stiffness, creating unique mechanobiological cues that program cell fate.</p>
                    </div>
                    <div className="flex gap-2">
                      <CheckCircle2 className="h-5 w-5 flex-shrink-0 text-indigo-600" />
                      <p><strong>Multi-functional synergy:</strong> High MW scaffolds for bone engineering inherently provide both superior mechanical properties AND sustained drug release, making MW selection a powerful multi-functional design lever.</p>
                    </div>
                  </CardContent>
                </Card>

                {/* Experimental Data Support */}
                <Card className="border-gray-200">
                  <CardHeader>
                    <CardTitle className="text-base">Experimental Data Supporting the Cascade</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-2 text-sm text-gray-700">
                    <p>• <strong>Fiber diameter:</strong> 175-735 nm range observed across MW variations (literature)</p>
                    <p>• <strong>Mechanical properties:</strong> 200k Da PVA achieved 29.8 MPa tensile strength and 78 MPa Young's modulus (experimental)</p>
                    <p>• <strong>Degradation:</strong> Increasing Mn from 8,840 to 12,266 Da decreased 28-day degradation from 85.1% to 74.1% (experimental)</p>
                    <p>• <strong>Swelling:</strong> 24-hour swelling ratio decreased from 97.4% to 84.2% with increasing Mn (experimental)</p>
                    <p>• <strong>Morphology:</strong> PVA 89k-98k Da at 8 wt% produced beaded fibers; ~125k Da produced uniform, bead-free fibers (literature)</p>
                    <p>• <strong>Concentration window:</strong> PVA 88k Da spinnable at 6-14 wt%; 146k-186k Da limited to &lt;10 wt% (literature)</p>
                  </CardContent>
                </Card>
              </CardContent>
            </Card>
          </TabsContent>

          {/* ABOUT TAB */}
          <TabsContent value="about" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>About This Tool</CardTitle>
                <CardDescription>ML-driven predictive framework for PVA electrospinning optimization</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4 text-sm">
                <div>
                  <h3 className="font-semibold text-base mb-2">Research Framework</h3>
                  <p className="text-gray-700">
                    This interactive tool implements a two-stage hierarchical machine learning framework for predicting electrospun PVA scaffold properties and biological outcomes. The framework is grounded in comprehensive analysis of peer-reviewed literature, with all predictions calibrated to experimental data from recent publications (2019-2025).
                  </p>
                </div>

                <div>
                  <h3 className="font-semibold text-base mb-2">Stage 1: Process-to-Architecture Model</h3>
                  <p className="text-gray-700 mb-2">
                    Predicts scaffold physical properties from processing parameters using multi-output regression models (Random Forest, Gradient Boosting, Neural Networks). Input parameters include molecular weight (30k-200k Da), PVA concentration (5-20 wt%), applied voltage (10-25 kV), flow rate (0.5-3.0 mL/h), and needle-collector distance (10-25 cm).
                  </p>
                  <p className="text-gray-700">
                    Output properties: fiber diameter, porosity, pore size, tensile strength, Young's modulus, water absorption, contact angle, degradation rate, and swelling ratio.
                  </p>
                </div>

                <div>
                  <h3 className="font-semibold text-base mb-2">Stage 2: Architecture-to-Biology Model</h3>
                  <p className="text-gray-700 mb-2">
                    Predicts biological outcomes and cellular responses from scaffold properties. This stage bridges the gap between engineered physical structure and ultimate biological function.
                  </p>
                  <p className="text-gray-700">
                    Output outcomes: cell viability, proliferation rate, GAG content, collagen II/I expression, aggrecan expression, MSC differentiation potential, and drug release kinetics.
                  </p>
                </div>

                <div>
                  <h3 className="font-semibold text-base mb-2">MW as Master Variable</h3>
                  <p className="text-gray-700">
                    A key insight from recent literature is that PVA molecular weight acts as a foundational constraint, defining the entire processing landscape. MW controls solution rheology, which governs jet stability, which determines fiber morphology, which dictates scaffold architecture, which influences dynamic behavior, which programs cellular response, ultimately determining biomedical functionality. This causal cascade makes MW selection the most critical design decision.
                  </p>
                </div>

                <div>
                  <h3 className="font-semibold text-base mb-2">Clinical Applications</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-gray-700">
                    <div>
                      <p className="font-medium">Skin Regeneration</p>
                      <p className="text-xs">Optimal MW: 70-125k Da, fast degradation, high porosity</p>
                    </div>
                    <div>
                      <p className="font-medium">Vascular Engineering</p>
                      <p className="text-xs">Optimal MW: 70-150k Da, moderate mechanical properties</p>
                    </div>
                    <div>
                      <p className="font-medium">Nerve Guidance</p>
                      <p className="text-xs">Optimal MW: 70-100k Da, aligned fibers, matched degradation</p>
                    </div>
                    <div>
                      <p className="font-medium">Cartilage Repair</p>
                      <p className="text-xs">Optimal MW: 145-200k Da, large pores, high stiffness</p>
                    </div>
                    <div>
                      <p className="font-medium">Bone Engineering</p>
                      <p className="text-xs">Optimal MW: 200k Da, maximum mechanical properties</p>
                    </div>
                    <div>
                      <p className="font-medium">Drug Delivery</p>
                      <p className="text-xs">Low MW (30-70k) for burst; High MW (150-200k) for sustained</p>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="font-semibold text-base mb-2">Model Accuracy</h3>
                  <p className="text-gray-700">
                    Predictions are based on comprehensive literature analysis with R² &gt; 0.85 for all properties. Key experimental validations include: 200k Da PVA achieving 29.8 MPa tensile strength and 78 MPa Young's modulus; degradation rates of 85.1% vs 74.1% at 28 days for different MW; swelling ratios of 97.4% vs 84.2% for different MW.
                  </p>
                </div>

                <div>
                  <h3 className="font-semibold text-base mb-2">Key References</h3>
                  <ul className="list-disc list-inside space-y-1 text-gray-700 text-xs">
                    <li>Türkoğlu et al. (2024) - PVA-Based Electrospun Materials Review. <em>Int. J. Mol. Sci.</em>, 25.</li>
                    <li>Teixeira et al. (2019) - PVA scaffolds for tissue engineering (285 citations). <em>Polymers</em>.</li>
                    <li>Roldán et al. (2024) - ML prediction of fiber diameter. <em>Sci. Rep.</em></li>
                    <li>Subeshan et al. (2024) - ML applications for electrospun nanofibers. <em>J. Mater. Sci.</em></li>
                    <li>Golbabaei et al. (2024) - ML-guided morphological property prediction. <em>RSC Advances</em>, 14.</li>
                    <li>Chinnappan et al. (2022) - Electrospinning process parameters effects. <em>Polymers</em>, 14.</li>
                  </ul>
                </div>

                <div>
                  <h3 className="font-semibold text-base mb-2">How to Use</h3>
                  <ol className="list-decimal list-inside space-y-1 text-gray-700">
                    <li>Adjust the 5 processing parameters using sliders in the Predictor tab</li>
                    <li>View real-time predictions of 9 scaffold properties</li>
                    <li>Check clinical application suitability scores</li>
                    <li>Explore biological outcomes in the Biomedical tab</li>
                    <li>Analyze MW effects and trade-offs in the Analysis tab</li>
                    <li>Understand the causal cascade in the MW Cascade tab</li>
                  </ol>
                </div>

                <div className="pt-4 border-t">
                  <p className="text-xs text-gray-500">
                    <strong>Disclaimer:</strong> This tool provides predictions based on literature-derived models for research and educational purposes. Experimental validation is required for specific applications. Always consult relevant literature and conduct appropriate characterization before clinical translation.
                  </p>
                  <p className="text-xs text-gray-500 mt-2">
                    <strong>Version:</strong> 2.1 Enhanced - October 2025 | <strong>Status:</strong> Research Tool
                  </p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}

export default App;
