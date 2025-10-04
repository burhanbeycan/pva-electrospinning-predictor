# PVA Electrospinning Predictor

**ML-Driven Biomedical Scaffold Optimization Platform**

An interactive web application for predicting electrospun PVA scaffold properties and biological outcomes using a two-stage hierarchical machine learning framework.

## 🌟 Features

### Two-Stage ML Framework

**Stage 1: Process-to-Architecture Model**
- Predicts 9 scaffold properties from 5 processing parameters
- Real-time predictions with interactive sliders
- Concentration window validation
- Morphology assessment (bead-free vs. beaded fibers)

**Stage 2: Architecture-to-Biology Model**
- Predicts biological outcomes from scaffold properties
- Cell viability and proliferation rates
- Chondrogenesis markers (GAG content, Collagen II, Aggrecan)
- MSC differentiation potential (neurogenic, chondrogenic, osteogenic)
- Drug release kinetics (burst vs. sustained)

### Comprehensive Biomedical Analysis

- **6 Clinical Applications**: Skin regeneration, vascular engineering, nerve guidance, cartilage repair, bone engineering, drug delivery
- **6 Cell Types**: Fibroblasts, endothelial cells, Schwann cells, chondrocytes, osteoblasts, stem cells
- **16-Week Biodegradation Profile**: Mass loss, mechanical retention, cell infiltration
- **MW Cascade Visualization**: How molecular weight controls the entire design hierarchy

### Interactive Visualizations

- Real-time parameter adjustment
- Multi-property radar charts
- MW comparison line charts
- Trade-off scatter plots
- Temporal degradation profiles
- MSC differentiation bar charts

## 📊 Input Parameters

1. **Molecular Weight**: 30k-200k Da
2. **PVA Concentration**: 5-20 wt%
3. **Applied Voltage**: 10-25 kV
4. **Flow Rate**: 0.5-3.0 mL/h
5. **Needle-Collector Distance**: 10-25 cm

## 🔬 Output Properties

### Stage 1 Outputs (9 Properties)
- Fiber diameter (nm)
- Porosity (%)
- Average pore size (μm)
- Tensile strength (MPa)
- Young's modulus (MPa)
- Water absorption (%)
- Contact angle (degrees)
- Degradation rate (%/week)
- Swelling ratio (%)

### Stage 2 Outputs (Biological)
- Cell viability (%)
- Proliferation time (hours)
- GAG content (μg/mg)
- Collagen II expression (fold change)
- Aggrecan expression (fold change)
- Collagen I/II ratio
- MSC lineage commitment
- Drug release profile

## 🚀 Quick Start - GitHub Pages Deployment

### Method 1: Automated Deployment (Recommended)

1. **Create GitHub Repository**
   ```bash
   # On GitHub, create a new repository named "pva-electrospinning-predictor"
   ```

2. **Upload Files**
   ```bash
   cd electrospinning-predictor
   git init
   git add .
   git commit -m "Initial commit: PVA electrospinning predictor v2.1"
   git branch -M main
   git remote add origin https://github.com/YOUR_USERNAME/pva-electrospinning-predictor.git
   git push -u origin main
   ```

3. **Enable GitHub Actions**
   - Go to repository Settings → Pages
   - Source: GitHub Actions
   - The workflow will automatically deploy on every push

4. **Access Your Site**
   - URL: `https://YOUR_USERNAME.github.io/pva-electrospinning-predictor/`
   - Wait 2-3 minutes for first deployment

### Method 2: Manual Deployment

1. **Build the Project**
   ```bash
   npm run build
   ```

2. **Deploy dist/ folder**
   - Go to repository Settings → Pages
   - Source: Deploy from a branch
   - Branch: `gh-pages` / `root` or `main` / `docs`
   - Copy contents of `dist/` to deployment branch

## 📚 Scientific Background

### Literature Foundation

This tool is grounded in comprehensive analysis of 15+ peer-reviewed papers (2019-2025):

- **Türkoğlu et al. (2024)**: PVA-based electrospun materials review
- **Teixeira et al. (2019)**: PVA scaffolds for tissue engineering (285 citations)
- **Roldán et al. (2024)**: ML prediction of fiber diameter
- **Subeshan et al. (2024)**: ML applications for electrospun nanofibers
- **Golbabaei et al. (2024)**: ML-guided morphological property prediction

### Experimental Validation

Key experimental data points integrated:
- **200k Da PVA**: 29.8 MPa tensile strength, 78 MPa Young's modulus
- **Degradation**: 85.1% vs 74.1% at 28 days for different MW
- **Swelling**: 97.4% vs 84.2% for different MW
- **Morphology**: Beaded fibers at low MW, uniform at optimal MW
- **Concentration windows**: MW-dependent spinnable ranges

### MW as Master Variable

A key insight: PVA molecular weight acts as a foundational constraint that:
1. Defines solution rheology
2. Controls jet stability
3. Determines fiber morphology
4. Dictates scaffold architecture
5. Influences dynamic behavior
6. Programs cellular response
7. Determines biomedical functionality

## 🛠️ Development

### Prerequisites

- Node.js 18+
- npm or pnpm

### Local Development

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

### Technology Stack

- **Frontend**: React 18
- **Build Tool**: Vite
- **Styling**: Tailwind CSS
- **UI Components**: shadcn/ui
- **Charts**: Recharts
- **Icons**: Lucide React

## 📖 How to Use

1. **Adjust Parameters**: Use sliders in the Predictor tab to set processing conditions
2. **View Predictions**: See real-time updates of scaffold properties
3. **Check Applications**: Review suitability scores for clinical applications
4. **Explore Biology**: Switch to Biomedical tab for cellular responses
5. **Analyze Trends**: Use Analysis tab for MW effects and trade-offs
6. **Understand Cascade**: View MW Cascade tab for design hierarchy

## 🎯 Clinical Applications

### Optimal MW Ranges

- **Skin Regeneration**: 70-125k Da (fast degradation, high porosity)
- **Vascular Engineering**: 70-150k Da (moderate mechanical properties)
- **Nerve Guidance**: 70-100k Da (aligned fibers, matched degradation)
- **Cartilage Repair**: 145-200k Da (large pores, high stiffness)
- **Bone Engineering**: 200k Da (maximum mechanical properties)
- **Drug Delivery**: 30-70k (burst) or 150-200k (sustained)

## ⚠️ Disclaimer

This tool provides predictions based on literature-derived models for research and educational purposes. Experimental validation is required for specific applications. Always consult relevant literature and conduct appropriate characterization before clinical translation.

## 📄 License

This project is open-source and available for research and educational use.

## 🙏 Acknowledgments

All predictions are calibrated to experimental data from peer-reviewed publications. This tool democratizes access to advanced prediction capabilities for the global research community.

## 📧 Contact

For questions, suggestions, or collaborations, please open an issue on GitHub.

---

**Version**: 2.1 Enhanced  
**Last Updated**: October 2025  
**Status**: Research Tool
